// models/notificationModel.js
const { getContainer } = require('../config/cosmosClient');
// const { v4: uuidv4 } = require('uuid');

const container = () => getContainer('Notifications');

// Send or upsert a notification
const sendNotification = async (notification) => {
  const data = {
    // id: uuidv4(),
    ...notification,
    isRead: false,
    date: new Date().toISOString(),
  };
  const { resource } = await container().items.create(data);
  return resource;
};

// Get notifications by email
const getNotificationsByEmail = async (email) => {
  const query = {
    query: 'SELECT * FROM c WHERE c.email = @email ORDER BY c.date DESC',
    parameters: [{ name: '@email', value: email }],
  };
  const { resources } = await container().items.query(query).fetchAll();
  return resources;
};

// Mark all as read for a user
const markAllAsRead = async (email) => {
  const notifications = await getNotificationsByEmail(email);
  const promises = notifications.map((n) => {
    n.isRead = true;
    return container().items.upsert(n);
  });
  await Promise.all(promises);
  return true;
};

// Get all notifications (admin or system-wide view)
const getAllNotifications = async () => {
  const { resources } = await container().items
    .query('SELECT * FROM c ORDER BY c.date DESC')
    .fetchAll();
  return resources;
};

module.exports = {
  sendNotification,
  getNotificationsByEmail,
  getAllNotifications,
  markAllAsRead,
};
