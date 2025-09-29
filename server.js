// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const { generateOTP, setOTP, verifyOTP } = require("./utils/otpStore");
const sendEmail = require("./utils/emailSender");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Send OTP API

app.get("/",(req, res)=>{
    res.send({message:"Test Api run"})
})
app.post("/send-otp", async (req, res) => {
  try {
    console.log("send-otp is run")
    const { contact } = req.body;
    if (!contact) return res.status(400).json({ error: "Contact required" });

    const otp = generateOTP();
    setOTP(contact, otp);

    if (contact.includes("@")) {
      // Email
    //   await sendEmail(contact, otp);
        res.status(200).json(otp)
    } else {
      // Phone (Optional: Twilio Integration)
      console.log(`OTP for ${contact}: ${otp} (send via SMS here)`);
       res.status(200).json(otp)
    }

    // res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP API
app.post("/verify-otp", (req, res) => {
    console.log("Verfiy otp is run");
  try {
    const { contact, otp } = req.body;
    if (!contact || !otp) return res.status(400).json({ error: "Contact & OTP required" });

    if (verifyOTP(contact, otp)) {
      return res.json({ success: true, token: "FAKE-JWT-TOKEN" }); // replace with real JWT if needed
    }

    return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
