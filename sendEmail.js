// sendResetCmd.js
require('dotenv').config();
const { sendResetEmail } = require('./utils/email');

// Accept email and token from CLI arguments
const email = process.argv[2];
const token = process.argv[3];

if (!email || !token) {
  console.error('❌ Usage: node sendResetCmd.js <email> <token>');
  process.exit(1);
}

// Construct reset link
const resetLink = `http://0.0.0.0:5000/reset-password?token=${token}`;

// Send the email
(async () => {
  try {
    await sendResetEmail(email, resetLink);
    console.log(`✅ Reset email sent to ${email}`);
  } catch (err) {
    console.error('❌ Error sending email:', err.message);
  }
})();
