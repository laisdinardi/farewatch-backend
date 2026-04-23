const { supabase } = require('../../../config/supabase');
const { getBestPrice } = require('../services/flightService');
const { storePriceObservation, analyzePrice } = require('../services/priceAnalyzer');
const { dispatchDealAlert } = require('../services/notificationService');
const { logger } = require('../utils/logger');

let isRunning = false;

async function runPriceCheck() {
  if (isRunning) {
    logger.warn('Price check job already running, skipping');
    return;
  }

  isRunning = true;
  const startTime = Date.now();
  logger.info('🔍 Starting price check job...');

  try {
    // Get all active routes with user data
    const { data: routes, error } = await supabase
      .from('tracked_routes')
      .select(`
        *,
        users!inner(
          id, email, name, 
          notify_email, notify_telegram, 
          telegram_chat_id,
          alert_threshold_20, alert_threshold_50
        )
      `)
      .eq('active', true)
      .not('users', 'is', null);

    if (error) {
      logger.error('Failed to fetch routes:', error);
      return;
    }

    logger.info(`Processing ${routes?.length || 0} active routes`);

    let dealsFound = 0;
    let alertsSent = 0;

    for (const route of (routes || [])) {
      try {
        await processRoute(route, route.users);
        
        // Rate limiting: small delay between requests
        await new Promise((r) => setTimeout(r, 1500));
      } catch (err) {
        logger.error(`Error processing route ${route.origin_iata}-${route.destination_iata}:`, err);
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    logger.info(`✅ Price check completed in ${duration}s. Deals: ${dealsFound}, Alerts: ${alertsSent}`);
  } finally {
    isRunning = false;
  }
}

async function processRoute(route, user) {
  logger.debug(`Checking: ${route.origin_iata} → ${route.destination_iata}`, {
    date: route.travel_date || route.flexible_month,
  });

  const bestFlight = await getBestPrice({
    origin: route.origin_iata,
    destination: route.destination_iata,
    travelDate: route.travel_date,
    flexibleMonth: route.flexible_month,
  });

  if (!bestFlight) {
    logger.debug(`No flights found for ${route.origin_iata}-${route.destination_iata}`);
    return;
  }

  // Store price in history
  await storePriceObservation({
    origin: route.origin_iata,
    destination: route.destination_iata,
    travelDate: route.travel_date,
    flexibleMonth: route.flexible_month,
    priceData: bestFlight,
  });

  // Update last checked
  await supabase
    .from('tracked_routes')
    .update({
      last_checked_at: new Date().toISOString(),
      last_price_brl: bestFlight.price_brl,
    })
    .eq('id', route.id);

  // Analyze against baseline
  const analysis = await analyzePrice({
    origin: route.origin_iata,
    destination: route.destination_iata,
    travelDate: route.travel_date,
    flexibleMonth: route.flexible_month,
    currentPrice: bestFlight.price_brl,
  });

  if (!analysis || !analysis.hasBaseline) {
    logger.debug(`No baseline yet for ${route.origin_iata}-${route.destination_iata}, accumulating data`);
    return;
  }

  logger.debug(`Price analysis: R$${bestFlight.price_brl} vs R$${analysis.baseline} baseline (${analysis.discountPercent}% off)`, {
    route: `${route.origin_iata}-${route.destination_iata}`,
  });

  // Check if it's a deal
  if (analysis.is50Deal || analysis.is20Deal) {
    logger.info(`🎯 DEAL DETECTED: ${route.origin_iata}-${route.destination_iata} ${analysis.discountPercent}% off`, {
      price: bestFlight.price_brl,
      baseline: analysis.baseline,
    });

    await dispatchDealAlert({
      user,
      route,
      priceData: bestFlight,
      analysis,
    });
  }
}

module.exports = { runPriceCheck };