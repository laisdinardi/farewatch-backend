const axios = require('axios');
const { logger } = require('./logger');

// Simple in-memory cache for exchange rates (1 hour TTL)
let rateCache = {};
let rateCacheTime = 0;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

/**
 * Fetch exchange rates from free API (no key required)
 */
async function getExchangeRates() {
  const now = Date.now();
  if (now - rateCacheTime < CACHE_TTL && Object.keys(rateCache).length > 0) {
    return rateCache;
  }

  try {
    // Using exchangerate-api.com free endpoint (no key needed)
    const response = await axios.get('https://open.er-api.com/v6/latest/BRL', {
      timeout: 5000,
    });
    rateCache = response.data.rates;
    rateCacheTime = now;
    return rateCache;
  } catch (err) {
    logger.warn('Failed to fetch exchange rates, using cached/fallback', { error: err.message });
    // Return cached even if stale, or fallback rates
    if (Object.keys(rateCache).length > 0) return rateCache;
    return {
      USD: 0.2,  // approximate fallback: 1 BRL = 0.2 USD => 1 USD = 5 BRL
      EUR: 0.18,
      GBP: 0.16,
      ARS: 200,
      BRL: 1,
    };
  }
}

/**
 * Convert any currency amount to BRL
 */
async function toBRL(amount, fromCurrency) {
  if (!amount || fromCurrency === 'BRL') return amount;

  const rates = await getExchangeRates();
  
  // rates are "1 BRL = X foreign", so to get BRL: amount / rate[currency]
  const rate = rates[fromCurrency.toUpperCase()];
  if (!rate) {
    logger.warn(`No rate found for ${fromCurrency}, returning original amount`);
    return amount;
  }

  // open.er-api returns rates relative to BRL base
  // 1 BRL = rates[USD] USD
  // So: X USD = X / rates[USD] BRL
  return Math.round((amount / rate) * 100) / 100;
}

module.exports = { toBRL, getExchangeRates };