require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const admin = require("firebase-admin");

const app = express();

/* =========================
   FIREBASE ADMIN INIT
   (FIXED: use JSON FILE, NOT env parse)
========================= */
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
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
  console.error("❌ Missing ENV variables (BREVO_API_KEY or SENDER_EMAIL)");
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

    // CHECK IF ACCOUNT EXISTS
    const docRef = db.collection("accounts").doc(docId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return res.status(404).json({
        status: "error",
        message: "Account not found"
      });
    }

    // GENERATE OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // SAVE OTP TO FIRESTORE
    await docRef.update({
      otp,
      isVerified: false,
      otpCreatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log("📩 OTP generated for:", email);

    // SEND EMAIL VIA BREVO
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

    console.log("✅ Email sent:", response.data);

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("❌ ERROR:", error.response?.data || error.message);

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
  res.send("🚀 OTP Server Running (Brevo + Firebase Admin)");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});