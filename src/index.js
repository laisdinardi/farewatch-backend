{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 require('dotenv').config();\
const express = require('express');\
const cors = require('cors');\
const helmet = require('helmet');\
const rateLimit = require('express-rate-limit');\
const \{ logger \} = require('./utils/logger');\
const \{ startScheduler \} = require('./jobs/scheduler');\
\
// Routes\
const authRoutes = require('./routes/auth');\
const routesRoutes = require('./routes/routes');\
const pricesRoutes = require('./routes/prices');\
const notificationsRoutes = require('./routes/notifications');\
const telegramRoutes = require('./routes/telegram');\
\
const app = express();\
const PORT = process.env.PORT || 4000;\
\
// \uc0\u9472 \u9472  Security Middleware \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
app.use(helmet());\
app.use(cors(\{\
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',\
  credentials: true,\
\}));\
app.use(express.json(\{ limit: '10kb' \}));\
\
// Global rate limiter\
const limiter = rateLimit(\{\
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),\
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),\
  standardHeaders: true,\
  legacyHeaders: false,\
  message: \{ error: 'Too many requests, please try again later.' \},\
\});\
app.use('/api/', limiter);\
\
// \uc0\u9472 \u9472  Routes \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
app.use('/api/auth', authRoutes);\
app.use('/api/routes', routesRoutes);\
app.use('/api/prices', pricesRoutes);\
app.use('/api/notifications', notificationsRoutes);\
app.use('/api/telegram', telegramRoutes);\
\
// Health check\
app.get('/health', (req, res) => \{\
  res.json(\{ status: 'ok', timestamp: new Date().toISOString() \});\
\});\
\
// \uc0\u9472 \u9472  Error Handler \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
app.use((err, req, res, next) => \{\
  logger.error('Unhandled error:', err);\
  res.status(err.status || 500).json(\{\
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,\
  \});\
\});\
\
// \uc0\u9472 \u9472  Start \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \u9472 \
app.listen(PORT, () => \{\
  logger.info(`FareWatch backend running on port $\{PORT\}`);\
  \
  // Start background jobs\
  if (process.env.NODE_ENV !== 'test') \{\
    startScheduler();\
  \}\
\});\
\
module.exports = app;}