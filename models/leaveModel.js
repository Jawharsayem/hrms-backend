// leaveModel.js
const { getContainer } = require('../config/cosmosClient');
const container = () => getContainer('Leaves');

const createLeaveRequest = async (leaveData) => {
  const id = `${leaveData.email}-${Date.now()}`;
  const newLeave = { id, ...leaveData };
  await container().items.create(newLeave);
  return newLeave;
};

const getAllLeaveRequests = async () => {
  const { resources } = await container().items
    .query('SELECT * FROM c ORDER BY c.requestedAt DESC')
    .fetchAll();
  return resources;
};

const getLeaveRequestsByEmployeeId = async (email) => {
  const { resources } = await container().items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email ORDER BY c.requestedAt DESC',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();
  return resources;
};

const updateLeaveStatus = async (email, newStatus) => {
  // Query for the most recent pending leave for this email
  const query = `
    SELECT * FROM c 
    WHERE c.email = @email AND c.status = 'Pending' 
    ORDER BY c.requestedAt DESC
  `;
  const parameters = [{ name: '@email', value: email }];

  const { resources } = await container().items
    .query({ query, parameters })
    .fetchAll();

  if (resources.length === 0) {
    throw new Error('No pending leave request found for this email');
  }

  const existing = resources[0];

  existing.status = newStatus;
  existing.reviewedAt = new Date().toISOString();

  const { resource: updated } = await container().items.upsert(existing);
  return updated;
};




module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  getLeaveRequestsByEmployeeId,
  updateLeaveStatus,
};
