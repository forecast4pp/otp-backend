const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-otp", async (req, res) => {
  const { email, otp, firstName } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password"
    }
  });

  const mailOptions = {
    from: "your_email@gmail.com",
    to: email,
    subject: "Your OTP Code",
    html: `<h3>Hello ${firstName}</h3>
           <p>Your OTP is: <b>${otp}</b></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({ status: "error", error });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});