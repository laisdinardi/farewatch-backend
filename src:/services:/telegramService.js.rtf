{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const TelegramBot = require('node-telegram-bot-api');\
const \{ supabase \} = require('../../config/supabase');\
const \{ logger \} = require('../utils/logger');\
const crypto = require('crypto');\
\
let bot = null;\
\
function getBot() \{\
  if (bot) return bot;\
  if (!process.env.TELEGRAM_BOT_TOKEN) \{\
    logger.warn('TELEGRAM_BOT_TOKEN not configured');\
    return null;\
  \}\
\
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, \{ polling: true \});\
  setupBotHandlers(bot);\
  logger.info('Telegram bot started');\
  return bot;\
\}\
\
function setupBotHandlers(bot) \{\
  // /start command\
  bot.onText(/\\/start(?:\\s+(.+))?/, async (msg, match) => \{\
    const chatId = msg.chat.id;\
    const linkToken = match?.[1];\
\
    if (linkToken) \{\
      // User clicked link with token \uc0\u8594  link their account\
      await handleLinkAccount(bot, chatId, linkToken, msg);\
    \} else \{\
      bot.sendMessage(chatId, \
        `\uc0\u9992 \u65039  *Welcome to FareWatch!*\\n\\nI'll notify you when flight prices drop significantly.\\n\\nTo link your account:\\n1. Go to $\{process.env.FRONTEND_URL\}/settings\\n2. Click "Connect Telegram"\\n3. Follow the link to connect this chat\\n\\nOnce linked, you'll receive alerts here automatically!`,\
        \{ parse_mode: 'Markdown' \}\
      );\
    \}\
  \});\
\
  // /status command\
  bot.onText(/\\/status/, async (msg) => \{\
    const chatId = String(msg.chat.id);\
    const \{ data: user \} = await supabase\
      .from('users')\
      .select('email, name, notify_telegram')\
      .eq('telegram_chat_id', chatId)\
      .single();\
\
    if (user) \{\
      bot.sendMessage(msg.chat.id,\
        `\uc0\u9989  *Account linked!*\\n\\n\u55357 \u56420  $\{user.name || user.email\}\\n\u55357 \u56551  $\{user.email\}\\n\u55357 \u56596  Notifications: $\{user.notify_telegram ? 'Enabled' : 'Disabled'\}`,\
        \{ parse_mode: 'Markdown' \}\
      );\
    \} else \{\
      bot.sendMessage(msg.chat.id,\
        `\uc0\u10060  No account linked to this chat.\\n\\nVisit $\{process.env.FRONTEND_URL\}/settings to connect.`\
      );\
    \}\
  \});\
\
  // /stop - unsubscribe\
  bot.onText(/\\/stop/, async (msg) => \{\
    const chatId = String(msg.chat.id);\
    await supabase\
      .from('users')\
      .update(\{ notify_telegram: false \})\
      .eq('telegram_chat_id', chatId);\
\
    bot.sendMessage(msg.chat.id, '\uc0\u55357 \u56597  Notifications paused. Use /start to re-enable.');\
  \});\
\
  // /help\
  bot.onText(/\\/help/, (msg) => \{\
    bot.sendMessage(msg.chat.id,\
      `*FareWatch Bot Commands*\\n\\n/start - Connect your account\\n/status - Check linked account\\n/stop - Pause notifications\\n/help - Show this message`,\
      \{ parse_mode: 'Markdown' \}\
    );\
  \});\
\
  bot.on('polling_error', (err) => \{\
    logger.error('Telegram polling error:', err.message);\
  \});\
\}\
\
async function handleLinkAccount(bot, chatId, token, msg) \{\
  try \{\
    // Find the token\
    const \{ data: linkData, error \} = await supabase\
      .from('telegram_link_tokens')\
      .select('user_id, expires_at, used')\
      .eq('token', token)\
      .single();\
\
    if (error || !linkData) \{\
      return bot.sendMessage(chatId, '\uc0\u10060  Invalid link. Please generate a new one from FareWatch settings.');\
    \}\
\
    if (linkData.used) \{\
      return bot.sendMessage(chatId, '\uc0\u10060  This link has already been used. Generate a new one.');\
    \}\
\
    if (new Date(linkData.expires_at) < new Date()) \{\
      return bot.sendMessage(chatId, '\uc0\u10060  This link has expired. Generate a new one from settings.');\
    \}\
\
    // Update user with telegram chat ID\
    await supabase\
      .from('users')\
      .update(\{\
        telegram_chat_id: String(chatId),\
        telegram_linked_at: new Date().toISOString(),\
        notify_telegram: true,\
      \})\
      .eq('id', linkData.user_id);\
\
    // Mark token as used\
    await supabase\
      .from('telegram_link_tokens')\
      .update(\{ used: true \})\
      .eq('token', token);\
\
    // Get user info for greeting\
    const \{ data: user \} = await supabase\
      .from('users')\
      .select('name, email')\
      .eq('id', linkData.user_id)\
      .single();\
\
    bot.sendMessage(chatId,\
      `\uc0\u9989  *Account linked successfully!*\\n\\nHello $\{user?.name || 'traveler'\}! \u55357 \u56395 \\n\\nYour Telegram is now connected to FareWatch.\\n\\nYou'll receive flight deal alerts here when prices drop significantly. \u9992 \u65039 \u55357 \u56613 `,\
      \{ parse_mode: 'Markdown' \}\
    );\
\
    logger.info(`Telegram linked for user $\{linkData.user_id\}`);\
  \} catch (err) \{\
    logger.error('Error linking Telegram account:', err);\
    bot.sendMessage(chatId, '\uc0\u10060  Something went wrong. Please try again.');\
  \}\
\}\
\
/**\
 * Generate a link token for connecting Telegram\
 */\
async function generateLinkToken(userId) \{\
  const token = crypto.randomBytes(32).toString('hex');\
  const expiresAt = new Date();\
  expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry\
\
  // Invalidate old tokens for this user\
  await supabase\
    .from('telegram_link_tokens')\
    .update(\{ used: true \})\
    .eq('user_id', userId)\
    .eq('used', false);\
\
  const \{ error \} = await supabase.from('telegram_link_tokens').insert(\{\
    user_id: userId,\
    token,\
    expires_at: expiresAt.toISOString(),\
  \});\
\
  if (error) throw error;\
\
  const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'FareWatchBot';\
  const deepLink = `https://t.me/$\{botUsername\}?start=$\{token\}`;\
  \
  return \{ token, deepLink, expiresAt \};\
\}\
\
/**\
 * Send deal alert via Telegram\
 */\
async function sendTelegramAlert(\{ chatId, route, priceData, analysis \}) \{\
  const telegramBot = getBot();\
  if (!telegramBot) \{\
    logger.warn('Telegram bot not available');\
    return false;\
  \}\
\
  try \{\
    const discountEmoji = analysis.is50Deal ? '\uc0\u55357 \u56613 ' : '\u55357 \u56521 ';\
    const discountLabel = analysis.is50Deal ? '50%+ MEGA DEAL' : '20%+ GREAT DEAL';\
\
    const formatBRL = (amount) =>\
      new Intl.NumberFormat('pt-BR', \{ style: 'currency', currency: 'BRL' \}).format(amount);\
\
    const stopsText = priceData.stops === 0 ? 'Direct' : `$\{priceData.stops\} stop(s)`;\
\
    const message = [\
      `$\{discountEmoji\} *$\{discountLabel\}*`,\
      '',\
      `\uc0\u9992 \u65039  *$\{route.origin_iata\} \u8594  $\{route.destination_iata\}*`,\
      `$\{route.origin_city || route.origin_iata\} \uc0\u8594  $\{route.destination_city || route.destination_iata\}`,\
      '',\
      `\uc0\u55357 \u56496  *Price: $\{formatBRL(priceData.price_brl)\}*`,\
      `\uc0\u55357 \u56522  Baseline: $\{formatBRL(analysis.baseline)\}`,\
      `\uc0\u55357 \u56504  You save: $\{formatBRL(analysis.savingsAmount)\} ($\{Math.round(analysis.discountPercent)\}% off)`,\
      '',\
      priceData.airline && priceData.airline !== 'Unknown' ? `\uc0\u55356 \u57335 \u65039  $\{priceData.airline\} \'b7 $\{stopsText\}` : '',\
      route.travel_date ? `\uc0\u55357 \u56517  $\{new Date(route.travel_date + 'T00:00:00').toLocaleDateString('pt-BR', \{ day: '2-digit', month: 'short', year: 'numeric' \})\}` : '',\
      route.flexible_month ? `\uc0\u55357 \u56517  $\{new Date(route.flexible_month + '-01').toLocaleDateString('pt-BR', \{ month: 'long', year: 'numeric' \})\}` : '',\
      '',\
      `[\uc0\u55356 \u57259  Book Now]($\{priceData.booking_link || 'https://www.kiwi.com'\})`,\
    ].filter(Boolean).join('\\n');\
\
    await telegramBot.sendMessage(chatId, message, \{\
      parse_mode: 'Markdown',\
      disable_web_page_preview: false,\
    \});\
\
    logger.info(`Telegram alert sent to chat $\{chatId\}`);\
    return true;\
  \} catch (err) \{\
    logger.error('Failed to send Telegram alert:', \{ error: err.message, chatId \});\
    return false;\
  \}\
\}\
\
module.exports = \{ getBot, generateLinkToken, sendTelegramAlert \};}