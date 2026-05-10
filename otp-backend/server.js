const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
// simple in-memory OTP store
const otpStore = {};

/* =========================
   GENERATE OTP
========================= */
app.post("/send-otp", async (req, res) => {
  const { email, firstName } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  // SAVE OTP
  otpStore[email] = {
    otp,
    expires: Date.now() + 5 * 60 * 1000 // 5 minutes
  };

  try {
    await transporter.sendMail({
      from: `"Forecast App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h2>Hello ${firstName}</h2>
        <p>Your OTP code is:</p>
        <h1>${otp}</h1>
      `
    });

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to send OTP"
    });
  }
});

/* =========================
   VERIFY OTP
========================= */
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({
      status: "error",
      message: "No OTP found"
    });
  }

  if (Date.now() > record.expires) {
    return res.status(400).json({
      status: "error",
      message: "OTP expired"
    });
  }

  if (parseInt(otp) !== record.otp) {
    return res.status(400).json({
      status: "error",
      message: "Invalid OTP"
    });
  }

  delete otpStore[email];

  return res.json({
    status: "success",
    message: "OTP verified"
  });
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});