// employeeModel.js
const { getContainer } = require('../config/cosmosClient');
const container = () => getContainer('Employees');

const getApprovedEmployees = async () => {
  const query = 'SELECT * FROM c WHERE c.status = "approved"';
  const { resources } = await container().items.query(query).fetchAll();
  return resources;
};
const getPendingEmployees = async () => {
  const query = 'SELECT * FROM c WHERE c.status = "pending" OR c.status = "declined"';
  const { resources } = await container().items.query(query).fetchAll();
  return resources;
};

const getEmployeeByEmail = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await findEmployeeByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const employeeData = {
      // Personal Info
      firstName: user.firstName || '',
      surname: user.surname || '',
      dob: user.dob || '',
      gender: user.gender || '',
      maritalStatus: user.maritalStatus || '',
      presentAddress: user.presentAddress || '',
      permanentAddress: user.permanentAddress || '',
      passportNo: user.passportNo || '',
      emirateIdNo: user.emirateIdNo || '',
      eidIssue: user.eidIssue || '',
      eidExpiry: user.eidExpiry || '',
      passportIssue: user.passportIssue || '',
      passportExpiry: user.passportExpiry || '',
      visaNo: user.visaNo || '',
      visaExpiry: user.visaExpiry || '',
      visaType: user.visaType || '',
      sponsor: user.sponsor || '',

      // Job Info
      position: user.position || '',
      wing: user.wing || '',
      homeLocal: user.homeLocal || '',
      joinDate: user.joinDate || '',
      retireDate: user.retireDate || '',

      // Contact Info
      landPhone: user.landPhone || '',
      mobile: user.mobile || '',
      email: user.email || '',
      altMobile: user.altMobile || '',
      botim: user.botim || '',
      whatsapp: user.whatsapp || '',
      emergency: user.emergency || '',

      // Salary Info
      bank: user.bank || '',
      accountNo: user.accountNo || '',
      accountName: user.accountName || '',
      iban: user.iban || '',

      // Emergency Contact
      emergencyName: user.emergencyName || '',
      emergencyRelation: user.emergencyRelation || '',
      emergencyPhone: user.emergencyPhone || '',
      emergencyEmail: user.emergencyEmail || '',
      emergencyBotim: user.emergencyBotim || '',
      emergencyWhatsapp: user.emergencyWhatsapp || '',

      // Family Info
      spouseName: user.spouseName || '',
      children: user.children || '',
      childDetails: user.childDetails || [],

      // Uploaded Files
      photo: user.photo || '',
      passport: user.passport || '',
      eid: user.eid || '',
      visa: user.visa || '',
      cv: user.cv || '',
      cert: user.cert || '',
      ref: user.ref || '',

      // Leave Info
      sickLeave: user.sickLeave || 0,
      casualLeave: user.casualLeave || 0,
      paidLeave: user.paidLeave || 0,

      status: user.status || 'pending',
    };

    return res.status(200).json(employeeData);
  } catch (err) {
    console.error('Error fetching employee:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


const findEmployeeByEmail = async (email) => {
  const { resources } = await container().items
    .query({ query: 'SELECT * FROM c WHERE c.email = @email', parameters: [{ name: '@email', value: email }] })
    .fetchAll();
  return resources[0];
};



const createEmployee = async (employee) => {
  employee.status = 'pending';
  const { resource } = await container().items.create(employee);
  return resource;
};

const updateEmployee = async (email, data) => {
  // console.log('eailllll: '+email);
  const existing = await findEmployeeByEmail(email);
  if (!existing) throw new Error('Employee not found');
  const updated = { ...existing, ...data };
  const { resource } = await container().items.upsert(updated);
  return resource;
};

// const approveEmployee = async (id) => {
//   const employee = await getEmployeeById(id);
//   if (!employee) throw new Error('Employee not found');
//   employee.status = 'approved';
//   const { resource } = await container().items.upsert(employee);
//   return resource;
// };

module.exports = {
  getPendingEmployees,
  getApprovedEmployees,
  findEmployeeByEmail,
  createEmployee,
  updateEmployee,
  getEmployeeByEmail
  // approveEmployee ,
};
