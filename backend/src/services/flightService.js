const axios = require('axios');
const { toBRL } = require('../utils/currency');
const { logger } = require('../utils/logger');

// Simple in-memory request cache
const requestCache = new Map();
const CACHE_TTL = 2 * 60 * 60 * 1000; // 2 hours

function getCacheKey(origin, destination, dateFrom, dateTo) {
  return `${origin}-${destination}-${dateFrom}-${dateTo}`;
}

function getCached(key) {
  const entry = requestCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > CACHE_TTL) {
    requestCache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  requestCache.set(key, { data, time: Date.now() });
  // Prevent unbounded growth
  if (requestCache.size > 500) {
    const firstKey = requestCache.keys().next().value;
    requestCache.delete(firstKey);
  }
}

/**
 * Search flights using Kiwi Tequila API (free tier)
 * Docs: https://tequila.kiwi.com/portal/docs/tequila-api
 */
async function searchKiwi({ origin, destination, dateFrom, dateTo, currency = 'BRL' }) {
  const cacheKey = getCacheKey(origin, destination, dateFrom, dateTo);
  const cached = getCached(cacheKey);
  if (cached) {
    logger.debug('Using cached flight data', { origin, destination });
    return cached;
  }

  try {
    const params = {
      fly_from: origin,
      fly_to: destination,
      date_from: dateFrom,
      date_to: dateTo || dateFrom,
      curr: 'BRL',
      limit: 10,
      sort: 'price',
      asc: 1,
      vehicle_type: 'aircraft',
      // Only paid flights (no miles)
      only_working_days: false,
      partner_market: 'br',
    };

    const headers = {};
    if (process.env.KIWI_API_KEY) {
      headers['apikey'] = process.env.KIWI_API_KEY;
    }

    const response = await axios.get('https://api.tequila.kiwi.com/v2/search', {
      params,
      headers,
      timeout: 10000,
    });

    const flights = (response.data.data || []).map((flight) => ({
      price_brl: flight.price,
      price_original: flight.price,
      original_currency: 'BRL',
      airline: flight.airlines?.[0] || flight.route?.[0]?.airline || 'Unknown',
      booking_link: flight.deep_link || `https://www.kiwi.com/booking?token=${flight.booking_token}`,
      duration_minutes: Math.round((flight.duration?.total || 0) / 60),
      stops: (flight.route?.length || 1) - 1,
      departure_at: flight.local_departure,
      arrival_at: flight.local_arrival,
      source: 'kiwi',
    }));

    setCache(cacheKey, flights);
    logger.info(`Kiwi: Found ${flights.length} flights`, { origin, destination });
    return flights;
  } catch (err) {
    if (err.response?.status === 429) {
      logger.warn('Kiwi rate limit hit');
    } else {
      logger.error('Kiwi API error:', { message: err.message, status: err.response?.status });
    }
    return [];
  }
}

/**
 * Search using Skyscanner unofficial endpoint (fallback)
 * This uses the public-facing browse prices endpoint
 */
async function searchSkyscanner({ origin, destination, yearMonth }) {
  const cacheKey = `sky-${origin}-${destination}-${yearMonth}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    // Skyscanner Browse Quotes public endpoint
    const [year, month] = yearMonth.split('-');
    const url = `https://www.skyscanner.com.br/transport/flights/${origin.toLowerCase()}/${destination.toLowerCase()}/${year.slice(2)}${month}/`;

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'pt-BR,pt;q=0.9',
        'x-skyscanner-deviceid': 'farewatch-app',
      },
      timeout: 10000,
    });

    // Parse response - Skyscanner returns embedded JSON
    const html = response.data;
    const jsonMatch = html.match(/"quotes":\[(.*?)\]/s);
    
    if (!jsonMatch) {
      logger.debug('Skyscanner: No quotes found in response');
      return [];
    }

    const flights = [];
    // Extract prices from Skyscanner response structure
    // Prices are in local currency, convert to BRL
    try {
      const quotesJson = JSON.parse(`[${jsonMatch[1]}]`);
      for (const quote of quotesJson.slice(0, 5)) {
        const priceBRL = await toBRL(quote.MinPrice || quote.price, 'BRL');
        flights.push({
          price_brl: priceBRL,
          price_original: quote.MinPrice || quote.price,
          original_currency: 'BRL',
          airline: quote.OutboundLeg?.CarrierIds?.[0] || 'Unknown',
          booking_link: `https://www.skyscanner.com.br/transport/flights/${origin.toLowerCase()}/${destination.toLowerCase()}/${year.slice(2)}${month}/`,
          stops: quote.Direct ? 0 : 1,
          source: 'skyscanner',
        });
      }
    } catch (parseErr) {
      logger.debug('Skyscanner: Failed to parse quotes');
    }

    setCache(cacheKey, flights);
    return flights;
  } catch (err) {
    logger.debug('Skyscanner fallback failed:', err.message);
    return [];
  }
}

/**
 * Main flight search function with fallback chain
 */
async function searchFlights({ origin, destination, travelDate, flexibleMonth }) {
  let dateFrom, dateTo;

  if (travelDate) {
    dateFrom = travelDate;
    dateTo = travelDate;
  } else if (flexibleMonth) {
    const [year, month] = flexibleMonth.split('-').map(Number);
    dateFrom = `${year}-${String(month).padStart(2, '0')}-01`;
    const lastDay = new Date(year, month, 0).getDate();
    dateTo = `${year}-${String(month).padStart(2, '0')}-${lastDay}`;
  } else {
    throw new Error('Either travelDate or flexibleMonth required');
  }

  // Primary: Kiwi API
  let results = await searchKiwi({ origin, destination, dateFrom, dateTo });

  // Fallback: Skyscanner
  if (results.length === 0 && flexibleMonth) {
    logger.info('Falling back to Skyscanner', { origin, destination });
    results = await searchSkyscanner({ origin, destination, yearMonth: flexibleMonth });
  }

  // Fallback: Skyscanner for specific date (use month)
  if (results.length === 0 && travelDate) {
    const yearMonth = travelDate.substring(0, 7);
    logger.info('Falling back to Skyscanner (from date)', { origin, destination });
    results = await searchSkyscanner({ origin, destination, yearMonth });
  }

  logger.info(`Total flights found: ${results.length}`, { origin, destination });
  return results;
}

/**
 * Get the best (cheapest) price for a route
 */
async function getBestPrice({ origin, destination, travelDate, flexibleMonth }) {
  const flights = await searchFlights({ origin, destination, travelDate, flexibleMonth });
  if (flights.length === 0) return null;

  // Sort by price and return cheapest
  flights.sort((a, b) => a.price_brl - b.price_brl);
  return flights[0];
}

module.exports = { searchFlights, getBestPrice };