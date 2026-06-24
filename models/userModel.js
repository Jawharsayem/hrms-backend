// userModel.js
const { getContainer } = require('../config/cosmosClient');

const userContainer = () => getContainer('Users');

const updateUserProfile = async (email, updates) => {
  const { resources } = await userContainer().items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();

  const user = resources[0];
  if (!user) throw new Error('User not found');

  Object.assign(user, updates);

  // Use correct partition key (e.g., email if /email, or id if /id)
  await userContainer().item(user.id, user.email).replace(user);

  return user;
};
const updateUserProfilePic = async (emailObj, imagePath) => {
  const email = typeof emailObj === 'object' ? emailObj.email : emailObj;

  console.log(email);

  const { resources } = await userContainer().items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();

  const user = resources[0];
  console.log(user);
  if (!user) throw new Error('User not found');

  user.profilePic = imagePath;

  await userContainer().item(user.id, user.email).replace(user);
  return user;
};

const findUserByEmail = async (email) => {
  console.log(email);
  const { resources } = await userContainer().items
    .query({ query: 'SELECT * FROM c WHERE c.email = @email', parameters: [{ name: '@email', value: email }] })
    .fetchAll();
  return resources[0];
};

const createUser = async (user) => {
  const { resource } = await userContainer().items.create(user);
  return resource;
};
async function setResetToken(email, token, expires) {
  const container = await getUserContainer();
  const { resource: user } = await container.items
    .query(`SELECT * FROM c WHERE c.email = "${email}"`)
    .fetchNext();

  if (user) {
    user.resetToken = token;
    user.resetTokenExpires = expires;
    await container.item(user.id, user.id).replace(user);
  }
}

// Add or update OTP for user
const setResetOtp = async (email, otp, expires) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('User not found');
  user.resetOtp = otp;
  user.otpExpires = expires;
  await userContainer().items.upsert(user);
};

// Find user by email and OTP
const findUserByOtp = async (email, otp) => {
  const { resources } = await userContainer().items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @e AND c.resetOtp = @o',
      parameters: [
        { name: '@e', value: email },
        { name: '@o', value: otp }
      ],
    })
    .fetchAll();
  return resources[0];
};
const updateUserPassword = async (email, newPasswordHash) => {
  const { resources } = await userContainer().items
    .query({
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email }],
    })
    .fetchAll();

  const user = resources[0];
  if (!user) throw new Error('User not found');

  user.password = newPasswordHash;
  user.resetOtp = null;
  user.resetOtpExpires = null;

  await userContainer().item(user.id, user.email).replace(user);
};
const updatePassword = async (email, hashed) => {
  try {
    // const { email, newPassword } = req.body;
    // if (!email || !hashed) {
    //   return res.status(400).json({ message: 'Email and new password are required.' });
    // }

    // const hashedPassword = await hashPassword(hashed);
    await updateUserPassword(email, hashed);

    // res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    // next(err);
    console.log("errosss:"+err)
  }
};

module.exports = {findUserByEmail, updateUserProfile,updateUserProfilePic , createUser, setResetOtp , findUserByOtp, setResetToken,updatePassword };
