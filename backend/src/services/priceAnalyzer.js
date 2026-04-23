const { supabase } = require('../../../config/supabase');
const { logger } = require('../utils/logger');

const ALERT_THRESHOLD_50 = 0.5;  // 50% below baseline
const ALERT_THRESHOLD_20 = 0.2;  // 20% below baseline

/**
 * Store a price observation in price_history
 */
async function storePriceObservation({ origin, destination, travelDate, flexibleMonth, priceData }) {
  const { error } = await supabase.from('price_history').insert({
    origin_iata: origin,
    destination_iata: destination,
    travel_date: travelDate || null,
    flexible_month: flexibleMonth || null,
    airline: priceData.airline,
    price_brl: priceData.price_brl,
    price_original: priceData.price_original,
    original_currency: priceData.original_currency || 'BRL',
    source: priceData.source || 'kiwi',
    booking_link: priceData.booking_link,
    flight_duration_minutes: priceData.duration_minutes,
    stops: priceData.stops,
  });

  if (error) {
    logger.error('Failed to store price observation:', error);
  }
}

/**
 * Compute and store baseline price for a route+month
 * Uses rolling average of last 30-60 days of price_history
 */
async function computeBaseline({ origin, destination, travelMonth }) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - 60); // 60 days lookback

  const { data: history, error } = await supabase
    .from('price_history')
    .select('price_brl, fetched_at')
    .eq('origin_iata', origin)
    .eq('destination_iata', destination)
    .gte('fetched_at', cutoffDate.toISOString())
    .or(`flexible_month.eq.${travelMonth},travel_date.like.${travelMonth}%`)
    .order('fetched_at', { ascending: false });

  if (error || !history || history.length < 3) {
    logger.debug(`Not enough data for baseline: ${origin}-${destination}-${travelMonth} (${history?.length || 0} samples)`);
    return null;
  }

  // Use median to avoid outlier skew
  const prices = history.map((h) => h.price_brl).sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  const median = prices.length % 2 !== 0
    ? prices[mid]
    : (prices[mid - 1] + prices[mid]) / 2;

  // Also compute rolling average (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recent = history.filter((h) => new Date(h.fetched_at) > thirtyDaysAgo);
  
  let baseline;
  if (recent.length >= 3) {
    const recentAvg = recent.reduce((sum, h) => sum + h.price_brl, 0) / recent.length;
    // Use average of median and recent average
    baseline = (median + recentAvg) / 2;
  } else {
    baseline = median;
  }

  baseline = Math.round(baseline * 100) / 100;

  // Upsert baseline
  const { error: upsertError } = await supabase
    .from('price_baselines')
    .upsert({
      origin_iata: origin,
      destination_iata: destination,
      travel_month: travelMonth,
      baseline_price_brl: baseline,
      sample_count: history.length,
      computed_at: new Date().toISOString(),
    }, {
      onConflict: 'origin_iata,destination_iata,travel_month',
    });

  if (upsertError) {
    logger.error('Failed to upsert baseline:', upsertError);
  }

  logger.debug(`Baseline computed: ${origin}-${destination}-${travelMonth} = R$${baseline} (${history.length} samples)`);
  return baseline;
}

/**
 * Get baseline price for a route+month
 * Falls back to computation if not cached
 */
async function getBaseline({ origin, destination, travelMonth }) {
  const { data: existing } = await supabase
    .from('price_baselines')
    .select('baseline_price_brl, computed_at')
    .eq('origin_iata', origin)
    .eq('destination_iata', destination)
    .eq('travel_month', travelMonth)
    .single();

  // Use cached baseline if computed within last 24 hours
  if (existing) {
    const age = Date.now() - new Date(existing.computed_at).getTime();
    if (age < 24 * 60 * 60 * 1000) {
      return existing.baseline_price_brl;
    }
  }

  return await computeBaseline({ origin, destination, travelMonth });
}

/**
 * Analyze a current price against baseline and return deal info
 */
async function analyzePrice({ origin, destination, travelDate, flexibleMonth, currentPrice }) {
  const travelMonth = travelDate
    ? travelDate.substring(0, 7)
    : flexibleMonth;

  if (!travelMonth) return null;

  const baseline = await getBaseline({ origin, destination, travelMonth });
  if (!baseline) {
    logger.debug(`No baseline available for ${origin}-${destination}-${travelMonth}`);
    return { hasBaseline: false, baseline: null, currentPrice, discountPercent: 0 };
  }

  const discountPercent = ((baseline - currentPrice) / baseline) * 100;
  const discountDecimal = (baseline - currentPrice) / baseline;

  return {
    hasBaseline: true,
    baseline,
    currentPrice,
    discountPercent: Math.round(discountPercent * 100) / 100,
    is50Deal: discountDecimal >= ALERT_THRESHOLD_50,
    is20Deal: discountDecimal >= ALERT_THRESHOLD_20,
    savingsAmount: Math.round((baseline - currentPrice) * 100) / 100,
  };
}

/**
 * Check if an alert was already sent recently for this route/price
 * Prevents duplicate alerts (cooldown: 24 hours)
 */
async function wasAlertSentRecently({ userId, trackedRouteId, alertType }) {
  const cutoff = new Date();
  cutoff.setHours(cutoff.getHours() - 24);

  const { data } = await supabase
    .from('alerts_sent')
    .select('id')
    .eq('user_id', userId)
    .eq('tracked_route_id', trackedRouteId)
    .eq('alert_type', alertType)
    .gte('sent_at', cutoff.toISOString())
    .limit(1);

  return (data?.length || 0) > 0;
}

/**
 * Record that an alert was sent
 */
async function recordAlertSent({ userId, trackedRouteId, priceData, baseline, discountPercent, alertType, channels }) {
  const { error } = await supabase.from('alerts_sent').insert({
    user_id: userId,
    tracked_route_id: trackedRouteId,
    price_brl: priceData.price_brl,
    baseline_price_brl: baseline,
    discount_percent: discountPercent,
    alert_type: alertType,
    booking_link: priceData.booking_link,
    airline: priceData.airline,
    travel_date: priceData.departure_at ? priceData.departure_at.split('T')[0] : null,
    channels,
  });

  if (error) logger.error('Failed to record alert:', error);
}

module.exports = {
  storePriceObservation,
  computeBaseline,
  getBaseline,
  analyzePrice,
  wasAlertSentRecently,
  recordAlertSent,
};