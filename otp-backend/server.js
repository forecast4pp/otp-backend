const express = require("express");
const cors = require("cors");
const axios = require("axios");

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
   ENV CHECK (IMPORTANT)
========================= */
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

if (!BREVO_API_KEY || !SENDER_EMAIL) {
  console.error("❌ Missing ENV variables:");
  console.error("BREVO_API_KEY or SENDER_EMAIL is undefined");
}

/* =========================
   SEND OTP ROUTE
========================= */
app.post("/send-otp", async (req, res) => {
  try {
    const { email, firstName } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({
        status: "error",
        message: "Missing email or firstName"
      });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log("📩 Sending OTP to:", email);

    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Forecast App",
          email: SENDER_EMAIL
        },
        to: [
          {
            email,
            name: firstName
          }
        ],
        subject: "Your OTP Code",
        htmlContent: `
          <div style="font-family: Arial">
            <h2>Hello ${firstName},</h2>
            <p>Your OTP code is:</p>
            <h1 style="letter-spacing:8px; color:#2d6cdf">${otp}</h1>
            <p>This code will expire soon.</p>
          </div>
        `
      },
      {
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
          "accept": "application/json"
        }
      }
    );

    console.log("✅ Brevo response:", response.data);

    return res.json({
      status: "success",
      message: "OTP sent successfully",
      // optional for debugging (REMOVE IN PROD)
      otp
    });

  } catch (error) {
    console.error("❌ BREVO ERROR:");
    console.error(error.response?.data || error.message);

    return res.status(500).json({
      status: "error",
      message: "Failed to send OTP",
      details: error.response?.data || error.message
    });
  }
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("🚀 OTP Server Running (Brevo API)");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});