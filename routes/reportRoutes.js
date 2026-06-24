// reportRoutes.js
const express = require('express');
const router = express.Router();
const {
  exportEmployeePDF,
  exportAllEmployeesAsCSV,
} = require('../controllers/reportController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.use(protect, isAdmin);

router.get('/employee/:id/pdf', exportEmployeePDF);
router.get('/employees/csv', exportAllEmployeesAsCSV); // Placeholder

module.exports = router;
