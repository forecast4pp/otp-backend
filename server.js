const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(express.json());

/* =========================
   SMTP SETUP (GMAIL)
========================= */
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // MUST be App Password
  }
});

/* =========================
   SEND OTP ROUTE
========================= */
app.post("/send-otp", async (req, res) => {
  const { email, firstName } = req.body;

  if (!email || !firstName) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields"
    });
  }

  // generate OTP HERE
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const mailOptions = {
      from: `"Forecast App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial; padding: 16px;">
          <h2>Hello ${firstName}</h2>
          <p>Your OTP code is:</p>
          <h1 style="letter-spacing: 6px; font-size: 32px;">${otp}</h1>
          <p>This code will expire soon.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ OTP SENT SUCCESSFULLY");

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("❌ SMTP ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Failed to send OTP",
      error: error.message
    });
  }
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("OTP Server Running (SMTP)");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
