const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "epoxyfurnishudr@gmail.com",
      pass: "mcwp aize zjlg xmqz", // Use App Passwords, not real password
    },
  });

  const mailOptions = {
    from: email,
    to: "epoxyfurnishudr@gmail.com",
    subject: "Franchise Inquiry",
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Mail sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to send mail" });
  }
});

module.exports = router;
