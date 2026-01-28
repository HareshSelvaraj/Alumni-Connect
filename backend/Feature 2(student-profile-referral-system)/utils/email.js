// src/utils/email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,             // e.g., 'smtp.gmail.com'
  port: Number(process.env.SMTP_PORT),     // e.g., 587
  secure: process.env.SMTP_PORT == '465',  // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,            // your SMTP username/email
    pass: process.env.SMTP_PASS             // your SMTP password or app password
  },
  tls: {
    rejectUnauthorized: false               // allows self-signed certificates
  }
});

module.exports.sendReferralRequest = ({ to, fromName, msg }) =>
  transporter.sendMail({
    from: '"Alumni Connect" <no-reply@platform.com>',
    to,
    subject: `Referral Request from ${fromName}`,
    text: msg
  });
