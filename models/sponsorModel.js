// models/sponsorModel.js
const { getContainer } = require('../config/cosmosClient');
const container = () => getContainer('Sponsors');

// Get sponsor by email
const getSponsorByEmail = async (email) => {
  const query = {
    query: 'SELECT * FROM c WHERE c.email = @email',
    parameters: [{ name: '@email', value: email }],
  };

  const { resources } = await container().items.query(query).fetchAll();
  return resources[0]; // assuming email is unique
};

// Update sponsor info
const updateSponsor = async (email, updatedData) => {
  const sponsor = await getSponsorByEmail(email);
  if (!sponsor) {
    throw new Error('Sponsor not found');
  }

  const updatedSponsor = {
    ...sponsor,
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  const { resource } = await container().items.upsert(updatedSponsor);
  return resource;
};

module.exports = {
  getSponsorByEmail,
  updateSponsor,
};
