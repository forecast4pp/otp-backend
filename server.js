const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());

app.post("/send-otp", async (req, res) => {
  const { email, otp, firstName } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `
        <h3>Hello ${firstName}</h3>
        <p>Your OTP is: <b>${otp}</b></p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.json({ status: "success" });

  } catch (error) {
    console.error("OTP EMAIL ERROR:", error);
    return res.status(500).json({
      status: "error",
      message: "Failed to send OTP",
      error: error.message
    });
  }
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
