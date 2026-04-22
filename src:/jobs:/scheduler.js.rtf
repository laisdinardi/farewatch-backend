{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const cron = require('node-cron');\
const \{ runPriceCheck \} = require('./priceChecker');\
const \{ logger \} = require('../utils/logger');\
\
function startScheduler() \{\
  const cronExpression = process.env.PRICE_CHECK_CRON || '0 */8 * * *';\
  \
  logger.info(`Starting price check scheduler: $\{cronExpression\}`);\
  \
  // Schedule recurring job\
  cron.schedule(cronExpression, async () => \{\
    logger.info('\uc0\u9200  Scheduled price check triggered');\
    try \{\
      await runPriceCheck();\
    \} catch (err) \{\
      logger.error('Scheduled price check failed:', err);\
    \}\
  \});\
\
  // Run once on startup (after 30 second delay to let server initialize)\
  setTimeout(async () => \{\
    logger.info('\uc0\u55357 \u56960  Running initial price check on startup...');\
    try \{\
      await runPriceCheck();\
    \} catch (err) \{\
      logger.error('Startup price check failed:', err);\
    \}\
  \}, 30000);\
\
  logger.info('\uc0\u9989  Scheduler started');\
\}\
\
module.exports = \{ startScheduler \};}