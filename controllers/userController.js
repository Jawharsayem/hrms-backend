// controllers/userController.js
const { findUserByEmail, updateUserProfile, updateUserProfilePic } = require('../models/userModel');
const { getContainer } = require('../config/cosmosClient');
const updateProfile = async (req, res, next) => {
  try {
    const { email } = req.query; 
    const { name, phone, department, position } = req.body;

    const updatedUser = await updateUserProfile(email, {
      name,
      phone,
      department,
      position,
    });

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    next(err);
  }
};


const getUserByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const {
      id,
      name,
      email: userEmail,
      phone = '',
      position = '',
      department = '',
      joinDate = '',
      profilePic='',
      fcmToken,
      role,
    } = user;
    const profilePicUrl = profilePic
    ? `https://hrdbbackend-h6ffbcf3aqfggxhq.southeastasia-01.azurewebsites.net${profilePic}`
    : '';
    res.status(200).json({
      id,
      name,
      email: userEmail,
      phone,
      position,
      department,
      joinDate,
      profilePic:profilePicUrl,
      fcmToken,
      role,
    });
  } catch (err) {
    next(err);
  }
};
const updateProfilePic = async (req, res, next) => {
  try {
    const email = req.query; 
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const imagePath = `/uploads/profile_pics/${file.filename}`;

    await updateUserProfilePic(email, imagePath);
    res.json({ message: 'Profile picture updated', imageUrl: imagePath });
  } catch (err) {
    next(err);
  }
};
const updateFcmToken = async (req, res, next) => {
  try {
    console.log('added fcm');
    const { email, fcmToken } = req.body;
    console.log(email);
    if (!email || !fcmToken) {
      return res.status(400).json({ message: 'Email and FCM token are required' });
    }

    const container = await getContainer('Users');

    const { resources } = await container.items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();

    const user = resources[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.fcmToken = fcmToken;

    const { resource: updatedUser } = await container.items.upsert(user);

    res.status(200).json({ message: 'FCM token updated', user: updatedUser });
  } catch (err) {
    console.error('Error updating FCM token:', err.message);
    next(err);
  }
};
module.exports = { getUserByEmail ,updateFcmToken, updateProfile, updateProfilePic};
