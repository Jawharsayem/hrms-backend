// models/taskModel.js
const { getContainer } = require('../config/cosmosClient');
const container = () => getContainer('Tasks');

const createTask = async (taskData) => {
  const { resource } = await container().items.create(taskData);
  return resource;
};

const getTasksByEmail = async (email) => {
  const query = 'SELECT * FROM c WHERE c.email = @email';
  const { resources } = await container().items
    .query({ query, parameters: [{ name: '@email', value: email }] })
    .fetchAll();
  return resources;
};

const toggleTaskCompletion = async (id, email) => {
  const { resource } = await container().item(id, email).read();
  if (!resource) throw new Error('Task not found');

  resource.isCompleted = !resource.isCompleted;
  const { resource: updated } = await container().items.upsert(resource);
  return updated;
};

const updateTaskStatus = async (id, email, newStatus) => {
  const { resource } = await container().item(id, email).read();
  if (!resource) throw new Error('Task not found');

  resource.status = newStatus;
  const { resource: updated } = await container().items.upsert(resource);
  return updated;
};

module.exports = {
  createTask,
  getTasksByEmail,
  toggleTaskCompletion,
  updateTaskStatus,
};
