const axios = require('axios');
const {
  sendNotification,
  getNotificationsByEmail,
  getAllNotifications,
  markAllAsRead,
} = require('../models/notificationModel');
const { getContainer } = require('../config/cosmosClient');
// const container = () => getContainer('Users');
const admin = require('../utils/firebase'); // For Firebase FCM push
const { findUserByEmail } = require('../models/userModel');

// ✅ Send in-app + push notification
const handleSendNotification = async (req, res, next) => {
  try {
    const { title, message, email,} = req.body;
    if (!title || !message || !email) {
      return res.status(400).json({ message: 'Missing required field(s)' });
    }
    // // Save in Cosmos DB
    try {
      await sendNotification({ title, message, email });
    } catch (e) {
      console.error('DB save error:', e.message);
    }

    // Retrieve FCM token
  
    const container = await getContainer('Users');

    const { resources } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();

    const user = resources[0];

    if (!user) {
      console.log('user not found');
    }
  const fcmToken = user?.fcmToken;
  console.log('FCM Token:', fcmToken);

    if (fcmToken) {
      const payload = {
        notification: {
          title,
          body: message
        },
        apns: {
          payload: {
            aps: {
              sound: "default",
              badge: 1,
            }
          }
        },
        token: fcmToken,
      };
    

      try {
        console.log('Sending push...');
        await admin.messaging().send(payload);
        console.log('Push sent!');
      } catch (pushErr) {
        console.warn('Push failed:', pushErr.message);
      }
    
    }
    res.status(201).json({ message: 'Notification sent' });
  } catch (err) {
    next(err);
  }
};


// ✅ Fetch all or by user
const handleFetchNotifications = async (req, res, next) => {
  try {
    const { email } = req.query;

    const list = email
      ? await getNotificationsByEmail(email)
      : await getAllNotifications();

    res.json(list);
  } catch (err) {
    next(err);
  }
};

// ✅ Mark all as read for user
const handleMarkAllRead = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: 'Email required' });
    }

    await markAllAsRead(email);
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  handleSendNotification,
  handleFetchNotifications,
  handleMarkAllRead,
};
