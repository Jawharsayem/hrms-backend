// controllers/salaryController.js
const {
  upsertSalaryInfo,
  getSalaryByEmail,
  deleteSalaryByEmail,
} = require('../models/salaryModel');
// const { v4: uuidv4 } = require('uuid');

const addOrUpdateSalary = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let existing = await getSalaryByEmail(data.email);

    // Ensure consistent ID handling
    if (!existing) {
      data.id = `${data.email}`; // consistent ID format
      data.createdAt = new Date().toISOString();
    } else {
      data.id = existing.id; // reuse existing ID
      data.createdAt = existing.createdAt;
    }

    data.updatedAt = new Date().toISOString();

    const result = await upsertSalaryInfo(data); // Cosmos DB-style upsert

    res.status(existing ? 200 : 201).json(result);
  } catch (err) {
    next(err);
  }
};

const getSalary = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const salary = await getSalaryByEmail(email);
    if (!salary) return res.status(404).json({ message: 'Salary info not found' });

    res.json(salary);
  } catch (err) {
    next(err);
  }
};

const deleteSalary = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    await deleteSalaryByEmail(email);
    res.json({ message: 'Salary info deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addOrUpdateSalary,
  getSalary,
  deleteSalary,
};
