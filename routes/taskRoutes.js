// routes/taskRoutes.js
const express = require('express');
const {
  createNewTask,
  getUserTasks,
  completeTaskToggle,
  updateStatus,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/create', createNewTask);
router.get('/user-tasks', getUserTasks);
router.put('/toggle-completion', completeTaskToggle);
router.put('/update-status', updateStatus);

module.exports = router;
