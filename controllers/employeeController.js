// employeeController.js
const {
    getPendingEmployees,
    getApprovedEmployees,
    createEmployee,
    updateEmployee,
    findEmployeeByEmail,
  } = require('../models/employeeModel');
  const { getContainer } = require('../config/cosmosClient');
  const container = () => getContainer('Employees');
  
  const listPendingEmployees = async (req, res, next) => {
    try {
      const employees = await getPendingEmployees();
      res.json(employees);
    } catch (err) {
      next(err);
    }
  };
  const listApprovedEmployees = async (req, res, next) => {
    try {
      const employees = await getApprovedEmployees();
      res.json(employees);
    } catch (err) {
      next(err);
    }
  };
  const getEmployee = async (req, res, next) => {
    try {
      const employee = await getEmployeeByEmail(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
      res.json(employee);
    } catch (err) {
      next(err);
    }
  };

  const approveEmployee = async (req, res) => {
    try {
      const { email } = req.query;
      if (!email) return res.status(400).json({ message: 'Email is required' });
  
      const employee = await findEmployeeByEmail(email);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
  
      employee.status = 'approved';
      const { resource } = await container().items.upsert(employee);
  
      res.status(200).json({ message: 'Employee approved', employee: resource });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  const declineEmployee = async (req, res) => {
    try {
      const { email } = req.query;
      if (!email) return res.status(400).json({ message: 'Email is required' });
  
      const employee = await findEmployeeByEmail(email);
      if (!employee) return res.status(404).json({ message: 'Employee not found' });
  
      employee.status = 'declined';
      const { resource } = await container().items.upsert(employee);
  
      res.status(200).json({ message: 'Employee declined', employee: resource });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  const addEmployee = async (req, res, next) => {
    try {
      const body = req.body;
  
      // Uploaded files
      const files = req.files;
      const passportFile = files?.passport?.[0];
      const sponsorFile = files?.sponsor?.[0];
      const photoFile = files?.photo?.[0];
      const visaFile = files?.visa?.[0];
      const eidFile = files?.eid?.[0];
      const cvFile = files?.cv?.[0];
      const certFile = files?.cert?.[0];
      const refFile = files?.ref?.[0];
  
      const employeeData = {
        id: `${Date.now()}-${body.email}`,
        firstName: body.firstName,
        surname: body.surname,
        dob: body.dob,
        gender: body.gender,
        maritalStatus: body.maritalStatus,
        presentAddress: body.presentAddress,
        permanentAddress: body.permanentAddress,
        passportNo: body.passportNo,
        emirateIdNo: body.emirateIdNo,
        eidIssue: body.eidIssue,
        eidExpiry: body.eidExpiry,
        passportIssue: body.passportIssue,
        passportExpiry: body.passportExpiry,
        visaNo: body.visaNo,
        visaExpiry: body.visaExpiry,
        visaType: body.visaType,
        sponsor: body.sponsor,
  
        position: body.position,
        wing: body.wing,
        homeLocal: body.homeLocal,
        joinDate: body.joinDate,
        retireDate: body.retireDate,
  
        landPhone: body.landPhone,
        mobile: body.mobile,
        email: body.email,
        altMobile: body.altMobile,
        botim: body.botim,
        whatsapp: body.whatsapp,
        emergency: body.emergency,
  
        bank: body.bank,
        accountNo: body.accountNo,
        accountName: body.accountName,
        iban: body.iban,
  
        emergencyName: body.emergencyName,
        emergencyRelation: body.emergencyRelation,
        emergencyPhone: body.emergencyPhone,
        emergencyEmail: body.emergencyEmail,
        emergencyBotim: body.emergencyBotim,
        emergencyWhatsapp: body.emergencyWhatsapp,
  
        spouseName: body.spouseName,
        children: body.children,
        childDetails: body.childDetails ? JSON.parse(body.childDetails) : [],
  
        photo: photoFile ? `/uploads/employees/${photoFile.filename}` : null,
        passport: passportFile ? `/uploads/employees/${passportFile.filename}` : null,
        eid: eidFile ? `/uploads/employees/${eidFile.filename}` : null,
        visa: visaFile ? `/uploads/employees/${visaFile.filename}` : null,
        cv: cvFile ? `/uploads/employees/${cvFile.filename}` : null,
        cert: certFile ? `/uploads/employees/${certFile.filename}` : null,
        ref: refFile ? `/uploads/employees/${refFile.filename}` : null,
  
        sickLeave: parseInt(body.sickLeave) || 0,
        casualLeave: parseInt(body.casualLeave) || 0,
        paidLeave: parseInt(body.paidLeave) || 0,
  
        status: 'pending', // default status
        createdAt: new Date().toISOString(),
      };
  
      const { resource } = await container().items.create(employeeData);
      res.status(201).json({ message: 'Employee created', employee: resource });
  
    } catch (err) {
      console.error('Error adding employee:', err);
      next(err);
    }
  };
  
  const editEmployee = async (req, res, next) => {
    try {
      const { email } = req.query;
      const employee = await updateEmployee(email, req.body);
      res.json({ message: 'Employee updated', employee });
    } catch (err) {
      next(err);
    }
  };
  
  const disableEmployee = async (req, res, next) => {
    try {
      const employee = await deactivateEmployee(req.params.id);
      res.json({ message: 'Employee deactivated', employee });
    } catch (err) {
      next(err);
    }
  };

  
  
  module.exports = {
    listPendingEmployees,
    listApprovedEmployees,
    getEmployee,
    addEmployee,
    approveEmployee ,
    editEmployee,
    disableEmployee,
    declineEmployee 
  };
  