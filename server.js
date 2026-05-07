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
const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   SEND OTP ROUTE
   ========================= */
app.post("/send-otp", async (req, res) => {

  const { email, otp, firstName } = req.body;

  try {

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        status: "error",
        message: "Missing RESEND_API_KEY"
      });
    }

    // Send email
    const response = await resend.emails.send({
      from: "Forecast App <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          
          <h2>Hello ${firstName}</h2>

          <p>Your OTP code is:</p>

          <div style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
            margin: 20px 0;
            color: #2563eb;
          ">
            ${otp}
          </div>

          <p>This OTP will expire shortly.</p>

        </div>
      `
    });

    console.log("EMAIL SENT:", response);

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.error("OTP EMAIL ERROR FULL:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });

    return res.status(500).json({
      status: "error",
      message: "Failed to send OTP",
      error: error.message
    });
  }
});

/* =========================
   TEST ROUTE
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
