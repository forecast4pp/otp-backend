const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

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
   SENDGRID SETUP
========================= */
if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ Missing SENDGRID_API_KEY");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* =========================
   SEND OTP ROUTE
========================= */
app.post("/send-otp", async (req, res) => {
  const { email, otp, firstName } = req.body;

  if (!email || !otp || !firstName) {
    return res.status(400).json({
      status: "error",
      message: "Missing required fields"
    });
  }

  try {
    const msg = {
      to: email,
      from: "Forecast App <your_verified_email@gmail.com>", // must be verified in SendGrid
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

    const response = await sgMail.send(msg);

    console.log("✅ OTP SENT:", response[0].statusCode);

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {
    console.error("❌ SENDGRID ERROR:", error.response?.body || error.message);

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
  res.send("OTP Server Running (SendGrid)");
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
