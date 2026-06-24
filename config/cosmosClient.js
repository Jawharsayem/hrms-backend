// cosmosClient.js
const { CosmosClient } = require('@azure/cosmos');

let client, database, containers = {};

const connectCosmosDB = async () => {
  client = new CosmosClient({
        endpoint: process.env.COSMOS_DB_ENDPOINT,
        key: process.env.COSMOS_DB_KEY,
      });
      
  database = client.database(process.env.COSMOS_DB_DATABASE);

  const containerNames = ['Users', 'Employees', 'Leaves', 'Tasks', 'Salaries','Notifications','Sponsors','Otps','FamilyMembers'];
  for (const name of containerNames) {
    containers[name] = database.container(name);
  }

  console.log('Connected to Cosmos DB');
};

const getContainer = (name) => containers[name];

module.exports = { connectCosmosDB, getContainer };
