// controllers/taskController.js
const {
    createTask,
    getTasksByEmail,
    toggleTaskCompletion,
    updateTaskStatus,
  } = require('../models/taskModel');
  
  const createNewTask = async (req, res, next) => {
    try {
      const { id, title, deadline, isCompleted, priority, status, email } = req.body;
  
      if (!id || !title || !deadline || !priority || !status || !email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const newTask = await createTask({
        id,
        title,
        deadline,
        isCompleted,
        priority,
        status,
        email,
        createdAt: new Date().toISOString(),
      });
  
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  };
  
  const getUserTasks = async (req, res, next) => {
    try {
      const email = req.query.email;
      if (!email) return res.status(400).json({ message: 'Email is required' });
  
      const tasks = await getTasksByEmail(email);
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  };
  
  const completeTaskToggle = async (req, res, next) => {
    try {
      const { id, email } = req.body;
      const task = await toggleTaskCompletion(id, email);
      res.json({ message: 'Task completion status updated', task });
    } catch (err) {
      next(err);
    }
  };
  
  const updateStatus = async (req, res, next) => {
    try {
      const { id, email, status } = req.body;
      const task = await updateTaskStatus(id, email, status);
      res.json({ message: 'Task status updated', task });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    createNewTask,
    getUserTasks,
    completeTaskToggle,
    updateStatus,
  };
  