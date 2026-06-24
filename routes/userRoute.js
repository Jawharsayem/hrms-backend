// routes/userRoutes.js
const express = require('express');
const { getUserByEmail } = require('../controllers/userController');
const { updateFcmToken } = require('../controllers/userController');
const { updateProfile, updateProfilePic } = require('../controllers/userController'); // Or userController if separated
const { authenticate} = require('../middleware/authMiddleware'); // JWT middleware
const {upload} = require('../middleware/uploadMiddleware');
const router = express.Router();


router.put('/update-profile-pic', authenticate, upload.single('profilePic'), updateProfilePic);
router.put('/update-profile', authenticate, updateProfile);
router.get('/by-email', getUserByEmail); // e.g. /api/users/by-email?email=test@example.com
router.put('/update-fcm-token', updateFcmToken);
module.exports = router;
