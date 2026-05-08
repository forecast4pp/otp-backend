require("dotenv").config(); // if using .env

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
   ROUTE: SEND OTP
   ========================= */
app.post("/send-otp", async (req, res) => {

  const { email, otp, firstName } = req.body;

  // Basic validation
  if (!email || !otp || !firstName) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields"
    });
  }

  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Forecast App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial;">
          <h2>Hello ${firstName}</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This code will expire soon.</p>
        </div>
      `
    };

    // Verify SMTP connection
    await transporter.verify();
    console.log("SMTP connection verified");

    // 🔥 ACTUAL SEND
    await transporter.sendMail(mailOptions);
    console.log("OTP SENT SUCCESSFULLY");

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.error("OTP EMAIL ERROR:", error);

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
  res.send("OTP Server Running");
});

/* =========================
   START SERVER
   ========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
