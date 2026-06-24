// reportController.js
const { generateEmployeeProfilePDF } = require('../utils/pdfGenerator');
const { getEmployeeById } = require('../models/employeeModel');

const exportEmployeePDF = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    const employee = await getEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const { filename, content } = await generateEmployeeProfilePDF(employee);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(content);
  } catch (err) {
    next(err);
  }
};

// Placeholder for future Excel export
const exportAllEmployeesAsCSV = async (req, res, next) => {
  try {
    // TODO: Add CSV export if needed
    return res.status(501).json({ message: 'CSV export not implemented yet' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  exportEmployeePDF,
  exportAllEmployeesAsCSV,
};
