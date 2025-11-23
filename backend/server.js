const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Contact Form Endpoint
app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS, // App password
        },
    });

    // Email Content
    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Your email to receive messages
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending message", error });
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
