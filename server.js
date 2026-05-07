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

/* =========================
   EMAIL TRANSPORTER
   ========================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },

  // Debugging
  logger: true,
  debug: true,

  // Timeouts
  connectionTimeout: 10000, // 10 sec
  greetingTimeout: 10000,
  socketTimeout: 10000
});

/* =========================
   VERIFY SMTP CONNECTION
   ========================= */
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY ERROR:", error);
  } else {
    console.log("SMTP SERVER IS READY");
  }
});

/* =========================
   SEND OTP ROUTE
   ========================= */
app.post("/send-otp", async (req, res) => {
  const { email, otp, firstName } = req.body;

  try {

    // Check if env vars exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        status: "error",
        message: "Missing EMAIL_USER or EMAIL_PASS"
      });
    }

    const mailOptions = {
      from: `"Forecast App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
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
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("EMAIL SENT:", info.response);

    return res.json({
      status: "success",
      message: "OTP sent successfully"
    });

  } catch (error) {

    console.error("OTP EMAIL ERROR FULL:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });

    return res.status(500).json({
      status: "error",
      message: "Failed to send OTP",
      error: error.message,
      code: error.code
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
