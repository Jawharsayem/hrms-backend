// authRoutes.js
const express = require('express');
const router = express.Router();
const { register,sendOtp,verifyOtp, login, forgotPassword, resetPasswordWithOtp,changePassword} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPasswordWithOtp);
// POST /auth/change-password
router.post('/change-password', changePassword);

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);

module.exports = router;
