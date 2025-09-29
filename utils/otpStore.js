// utils/otpStore.js
const otpStore = new Map();

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
}

function setOTP(identifier, otp) {
  otpStore.set(identifier, { otp, expires: Date.now() + 2 * 60 * 1000 }); // expires in 2 min
}

function verifyOTP(identifier, otp) {
  const record = otpStore.get(identifier);
  if (!record) return false;
  if (Date.now() > record.expires) return false;
  return record.otp === otp;
}

module.exports = { generateOTP, setOTP, verifyOTP };
