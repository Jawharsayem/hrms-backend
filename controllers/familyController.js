const { getContainer } = require('../config/cosmosClient');
const container = () => getContainer('FamilyMembers');

// GET /family?email=user@example.com
const getFamilyMembers = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const query = 'SELECT * FROM c WHERE c.email = @email';
    const parameters = [{ name: '@email', value: email }];

    const { resources } = await container().items
      .query({ query, parameters })
      .fetchAll();

    res.status(200).json(resources);
  } catch (err) {
    next(err);
  }
};

// POST /family/add
const addFamilyMember = async (req, res, next) => {
  try {
    const data = req.body;
    console.log('test0');
    // if (!data.email || !data.name || !data.relation) {
    //   return res.status(400).json({ message: 'Missing required fields' });
    // }
    console.log('test1');
    const member = {
      ...data,
      id: `${Date.now()}-${data.email}`,
      createdAt: new Date().toISOString(),
    };
console.log('test2');
    const { resource } = await container().items.create(member);
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
};

// DELETE /family/delete/:id
const deleteFamilyMember = async (req, res, next) => {
  try {
    const email = req.params.email;

    // Find item by ID (we assume partitionKey is email stored in 'email')
    const query = 'SELECT * FROM c WHERE c.id = @id';
    const parameters = [{ name: '@id', value: email }];
    const { resources } = await container().items
      .query({ query, parameters })
      .fetchAll();

    const item = resources[0];
    if (!item) return res.status(404).json({ message: 'Family member not found' });

    await container().item(item.id, item.email).delete();
    res.status(200).json({ message: 'Family member deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getFamilyMembers,
  addFamilyMember,
  deleteFamilyMember,
};
