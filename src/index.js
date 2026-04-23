require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { logger } = require('./utils/logger');
const { startScheduler } = require('./jobs/scheduler');

// Routes
const authRoutes = require('./routes/auth');
const routesRoutes = require('./routes/routes');
const pricesRoutes = require('./routes/prices');
const notificationsRoutes = require('./routes/notifications');
const telegramRoutes = require('./routes/telegram');

const app = express();
const PORT = process.env.PORT || 4000;

app.use('/notifications', notificationsRoutes);
app.use('/telegram', telegramRoutes);

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

// Global rate limiter
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/routes', routesRoutes);
app.use('/api/prices', pricesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/telegram', telegramRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error Handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});

// Start
app.listen(PORT, () => {
  logger.info(`FareWatch backend running on port ${PORT}`);

  if (process.env.NODE_ENV !== 'test') {
    startScheduler();
  }
});

module.exports = app;
