const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');

/**
 * GET /notifications/ping
 * Health check da rota
 */
router.get('/ping', (req, res) => {
  logger.info('Notifications route hit');
  res.json({ status: 'ok', service: 'notifications' });
});

module.exports = router;
