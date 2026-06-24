const { getContainer } = require('../config/cosmosClient');
const container = () => getContainer('Otps');

const setOtp = async (email, otp) => {
  const otpData = {
    id: email,
    email,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // expires in 5 mins
    createdAt: new Date().toISOString(),
  };

  await container().items.upsert(otpData);
};

const getOtp = async (email) => {
    try {
      const { resources } = await container()
        .items
        .query({
          query: 'SELECT * FROM c WHERE c.email = @email',
          parameters: [{ name: '@email', value: email }]
        })
        .fetchAll();
  
      return resources[0]; // 👈 Return first OTP record
    } catch (err) {
      console.error('Error in getOtp:', err);
      return null;
    }
  };
  

const deleteOtp = async (email) => {
  try {
    await container().item(email, email).delete();
  } catch (err) {
    // ignore if not found
  }
};

module.exports = { setOtp, getOtp, deleteOtp };
