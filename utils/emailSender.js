// utils/emailSender.js
const nodemailer = require("nodemailer");

async function sendEmail(to, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"MyApp" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It expires in 2 minutes.`,
  });

  console.log("OTP sent to email:", to);
}

module.exports = sendEmail;
