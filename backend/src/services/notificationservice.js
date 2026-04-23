const { sendDealAlert: sendEmail } = require('./emailService');
const { sendTelegramAlert } = require('./telegramService');
const { wasAlertSentRecently, recordAlertSent } = require('./priceAnalyzer');
const { logger } = require('../utils/logger');

/**
 * Send notifications for a detected deal
 * Handles deduplication, channel routing, and recording
 */
async function dispatchDealAlert({ user, route, priceData, analysis }) {
  const alertType = analysis.is50Deal ? '50_percent' : '20_percent';

  // Check deduplication
  const alreadySent = await wasAlertSentRecently({
    userId: user.id,
    trackedRouteId: route.id,
    alertType,
  });

  if (alreadySent) {
    logger.debug(`Alert already sent recently, skipping`, {
      userId: user.id,
      route: `${route.origin_iata}-${route.destination_iata}`,
      alertType,
    });
    return false;
  }

  // Check user preferences for this alert type
  const wantsThisAlert =
    (alertType === '50_percent' && route.alert_50_percent && user.alert_threshold_50) ||
    (alertType === '20_percent' && route.alert_20_percent && user.alert_threshold_20);

  if (!wantsThisAlert) {
    logger.debug(`User has disabled this alert type`, { alertType, userId: user.id });
    return false;
  }

  const channels = [];

  // Send email
  if (user.notify_email && user.email) {
    const sent = await sendEmail({ user, route, priceData, analysis });
    if (sent) channels.push('email');
  }

  // Send Telegram
  if (user.notify_telegram && user.telegram_chat_id) {
    const sent = await sendTelegramAlert({
      chatId: user.telegram_chat_id,
      route,
      priceData,
      analysis,
    });
    if (sent) channels.push('telegram');
  }

  if (channels.length > 0) {
    await recordAlertSent({
      userId: user.id,
      trackedRouteId: route.id,
      priceData,
      baseline: analysis.baseline,
      discountPercent: analysis.discountPercent,
      alertType,
      channels,
    });

    logger.info(`Alert dispatched via [${channels.join(', ')}]`, {
      user: user.email,
      route: `${route.origin_iata}-${route.destination_iata}`,
      price: priceData.price_brl,
      discount: `${analysis.discountPercent}%`,
    });
  }

  return channels.length > 0;
}

module.exports = { dispatchDealAlert };