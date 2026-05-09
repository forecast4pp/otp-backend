const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

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
   RESEND SETUP
========================= */
if (!process.env.RESEND_API_KEY) {
  console.error("❌ Missing RESEND_API_KEY in environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   ROUTE: SEND OTP
========================= */
app.post("/send-otp", async (req, res) => {
  const { email, otp, firstName } = req.body;

  // Validation
  if (!email || !otp || !firstName) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields"
    });
  }

  try {
    const result = await resend.emails.send({
      from: "Forecast App <onboarding@resend.dev>",
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
    });

    console.log("✅ OTP SENT:", result);

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("❌ OTP EMAIL ERROR:", error);

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
  console.log(`🚀 Server running on port ${PORT}`);
});
