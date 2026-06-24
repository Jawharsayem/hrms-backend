// routes/notificationRoutes.js
const express = require('express');
const {
  handleSendNotification,
  handleFetchNotifications,
  handleMarkAllRead,
} = require('../controllers/notificationController');

const router = express.Router();
// Save user's OneSignal player ID
// router.post('/player-id', savePlayerId);
router.get('/', handleFetchNotifications); // ?email=...
router.post('/send', handleSendNotification);
router.put('/mark-all-read', handleMarkAllRead);

module.exports = router;
