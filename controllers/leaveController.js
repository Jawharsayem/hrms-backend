// leaveController.js
const {
    createLeaveRequest,
    getAllLeaveRequests,
    updateLeaveStatus,
    // updateLeaveBalance,
    // getLeaveBalance
  } = require('../models/leaveModel');
  const { getContainer } = require('../config/cosmosClient');
  // const dayjs = require('dayjs'); 
  const container = () => getContainer('Leaves');
  
  const applyLeave = async (req, res, next) => {
    try {
      const {
        name,
        email,
        type,
        reason,
        fromDate,
        toDate,
        noOfDays,
        whatsapp,
        emergencyContact,
        substituteName,
        substituteContact,
        signature,
        designation,
        wing,
        status = 'Pending',
      } = req.body;
  
      // Validate required fields
      if (!name || !email || !type || !reason || !fromDate || !toDate) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const leaveData = {
        id: `${Date.now()}-${email}`,
        name,
        email,
        type,
        reason,
        fromDate,
        toDate,
        noOfDays,
        whatsapp,
        emergencyContact,
        substituteName,
        substituteContact,
        signature,
        designation,
        wing,
        status,
        requestedAt: new Date().toISOString(),
      };
  
      const newLeave = await createLeaveRequest(leaveData);
  
      res.status(201).json({
        message: 'Leave request submitted successfully',
        leave: newLeave,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const getLeaves = async (req, res, next) => {
    try {
      const { email } = req.query;
  
      let query;
      let parameters = [];
  
      if (email) {
        query = 'SELECT * FROM c WHERE c.email = @email ORDER BY c.createdAt DESC';
        parameters.push({ name: '@email', value: email });
      } else {
        query = 'SELECT * FROM c ORDER BY c.createdAt DESC';
      }
  
      const { resources } = await container().items
        .query({ query, parameters })
        .fetchAll();
  
      res.status(200).json(resources);
    } catch (err) {
      next(err);
    }
  };

  
  const viewAllLeaves = async (req, res, next) => {
    try {
      const leaves = await getAllLeaveRequests();
      res.json(leaves);
    } catch (err) {
      next(err);
    }
  };
  
  const approveLeave = async (req, res, next) => {
    try {
      const{email}= req.query;
      const leave = await updateLeaveStatus(email, 'approved');
      res.json({ message: 'Leave approved and balance updated', leave });
    } catch (err) {
      next(err);
    }
  };
  
  
  const rejectLeave = async (req, res, next) => {
    try {
      const{email}= req.query;
      const leave = await updateLeaveStatus(email, 'rejected');
      res.json({ message: 'Leave rejected', leave });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    applyLeave,
    getLeaves,
    viewAllLeaves,
    approveLeave,
    rejectLeave,
    // getLeaveBalanceAPI
  };
  