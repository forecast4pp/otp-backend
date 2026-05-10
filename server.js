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
   SEND OTP ROUTE
========================= */
app.post("/send-otp", async (req, res) => {
  try {
    const { email, firstName } = req.body;

    if (!email || !firstName) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Forecast App",
          email: process.env.SENDER_EMAIL
        },
        to: [
          {
            email: email,
            name: firstName
          }
        ],
        subject: "Your OTP Code",
        htmlContent: `
          <h2>Hello ${firstName}</h2>
          <p>Your OTP Code:</p>
          <h1 style="letter-spacing:6px">${otp}</h1>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ OTP sent to:", email);

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("❌ BREVO ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      status: "error",
      message: "Failed to send OTP"
    });
  }
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("OTP Server Running (Brevo API)");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
