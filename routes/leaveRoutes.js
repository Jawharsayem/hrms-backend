// leaveRoutes.js
const express = require('express');
const router = express.Router();
const {
  viewAllLeaves,
  approveLeave,
  rejectLeave,
  applyLeave,
  getLeaves,
} = require('../controllers/leaveController');
const { authenticate,protect, isAdmin } = require('../middleware/authMiddleware');

// Employee-only
router.post('/request', authenticate, applyLeave);
router.get('/my-leaves', protect, getLeaves);

// Admin-only
router.get('/', protect, isAdmin, viewAllLeaves);
router.put('/approve', protect, isAdmin, approveLeave);
router.put('/reject', protect, isAdmin, rejectLeave);

module.exports = router;
