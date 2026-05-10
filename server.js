const express = require("express");
const cors = require("cors");
const axios = require("axios");
const admin = require("firebase-admin");

const app = express();

/* =========================
   FIREBASE ADMIN INIT
========================= */
admin.initializeApp({
  credential: admin.credential.cert(
    JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  )
});

const db = admin.firestore();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use(express.json());

/* =========================
   ENV VARIABLES
========================= */
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;

if (!BREVO_API_KEY || !SENDER_EMAIL) {
  console.error("❌ Missing ENV variables");
}

/* =========================
   SEND OTP ROUTE
========================= */
app.post("/send-otp", async (req, res) => {
  try {
    const { email, firstName, docId } = req.body;

    if (!email || !firstName || !docId) {
      return res.status(400).json({
        status: "error",
        message: "Missing email, firstName, or docId"
      });
    }

    // Generate OTP ONCE
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to Firestore
    await db.collection("accounts").doc(docId).update({
      otp: otp,
      isVerified: false,
      otpCreatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("📩 Sending OTP to:", email);

    // Send email via Brevo
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
      message: "OTP sent and saved successfully"
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
  res.send("🚀 OTP Server Running (Brevo + Firebase)");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
