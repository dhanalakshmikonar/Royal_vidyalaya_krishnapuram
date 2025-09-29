const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Configure your SMTP (Gmail example)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "konardhanalakshmi@gmail.com",
      pass: "dhanam@2004", // Use Gmail App Password
    },
  });

  const mailOptions = {
    from: email,
    to: "recipient1@example.com, recipient2@example.com", // multiple emails
    subject: `Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
