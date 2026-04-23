const cron = require('node-cron');
const { runPriceCheck } = require('./priceChecker');
const { logger } = require('../utils/logger');

function startScheduler() {
  const cronExpression = process.env.PRICE_CHECK_CRON || '0 */8 * * *';
  
  logger.info(`Starting price check scheduler: ${cronExpression}`);
  
  // Schedule recurring job
  cron.schedule(cronExpression, async () => {
    logger.info('⏰ Scheduled price check triggered');
    try {
      await runPriceCheck();
    } catch (err) {
      logger.error('Scheduled price check failed:', err);
    }
  });

  // Run once on startup (after 30 second delay to let server initialize)
  setTimeout(async () => {
    logger.info('🚀 Running initial price check on startup...');
    try {
      await runPriceCheck();
    } catch (err) {
      logger.error('Startup price check failed:', err);
    }
  }, 30000);

  logger.info('✅ Scheduler started');
}

module.exports = { startScheduler };