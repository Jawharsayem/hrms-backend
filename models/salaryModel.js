// models/salaryModel.js
const { getContainer } = require('../config/cosmosClient');
const container = () => getContainer('Salaries');

const upsertSalaryInfo = async (data) => {
  const { resource } = await container().items.upsert(data);
  return resource;
};

const getSalaryByEmail = async (email) => {
  const query = {
    query: 'SELECT * FROM c WHERE c.email = @email',
    parameters: [{ name: '@email', value: email }],
  };

  const { resources } = await container().items.query(query).fetchAll();
  return resources.length ? resources[0] : null;
};

const deleteSalaryByEmail = async (email) => {
  const salary = await getSalaryByEmail(email);
  if (!salary) throw new Error('Salary info not found');
  await container().item(salary.id, salary.email).delete();
};

module.exports = {
  upsertSalaryInfo,
  getSalaryByEmail,
  deleteSalaryByEmail,
};
