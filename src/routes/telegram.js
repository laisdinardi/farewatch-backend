const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');

router.get('/ping', (req, res) => {
  logger.info('Telegram route hit');
  res.json({ status: 'ok', service: 'telegram' });
});

module.exports = router;