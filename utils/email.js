const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a password reset OTP email to the user.
 * @param {string} to - The recipient's email address.
 * @param {string} otp - The OTP to reset the password.
 */
const sendResetEmail = async (to, otp) => {
  const mailOptions = {
    from: `"HRMS Support" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Your OTP to Reset Password - HRMS',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Reset Your HRMS Password</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Use the OTP below to proceed:</p>
        <p style="font-size: 24px; font-weight: bold; color: #2c7be5;">${otp}</p>
        <p><strong>Note:</strong> This OTP will expire in 10 minutes.</p>
        <br>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <p>Regards,<br/>HRMS Team</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: `"HRMS App" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendResetEmail , sendEmail};
