// routes/salaryRoutes.js
const express = require('express');
const {
  addOrUpdateSalary,
  getSalary,
  deleteSalary,
} = require('../controllers/salaryController');

const router = express.Router();

router.post('/add-salary', addOrUpdateSalary);
router.get('/get-salary', getSalary);
router.delete('/delete-salary', deleteSalary);

module.exports = router;
