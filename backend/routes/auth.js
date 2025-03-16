const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // ✅ Fixed missing import
const User = require("../models/User.js");

// ✅ Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: "cristaosapp@gmail.com", // Replace with your email
        pass: "cuwo ufaj iest qtxg", // Use an App Password if using Gmail
    },
});

// ✅ Signup Route with Email Verification
router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;
    console.log(`🟢 Signup request: email=${email}, username=${username}`);

    try {
        // Validate input
        if (!email || !password || !username) {
            console.log("❌ Missing fields!");
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("❌ User already exists:", email);
            return res.status(409).json({ success: false, message: "Email already registered." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate unique verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");

        console.log("🔐 Password encrypted & token generated.");

        // Create and save new user
        const newUser = new User({ 
            email, 
            password: hashedPassword, 
            username,
            verificationToken, // Save token in DB
            isVerified: false, // ✅ Ensure user is not verified initially
        });

        await newUser.save();
        console.log("✅ New user created in database:", email);

        // ✅ Send verification email
        const verificationLink = `http://localhost:5001/api/auth/verify/${verificationToken}`;

        const mailOptions = {
            from: "your-email@gmail.com",
            to: email,
            subject: "Confirm Your Account",
            html: `<p>Click the link below to verify your account:</p>
                   <a href="${verificationLink}">${verificationLink}</a>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("📩 Verification email sent to:", email);

        return res.status(201).json({ success: true, message: "Account created! Check your email to verify your account." });

    } catch (error) {
        console.error("❌ Signup Error:", error);
        return res.status(500).json({ success: false, message: "Server error." });
    }
});

// ✅ Email Verification Route
router.get("/verify/:token", async (req, res) => {
    const { token } = req.params;
    console.log("🟢 Verifying token:", token);

    try {
        // Find user by verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            console.log("❌ Invalid or expired token.");
            return res.status(400).json({ message: "Invalid or expired token." });
        }

        // Update user to verified
        user.isVerified = true;
        user.verificationToken = undefined; // ✅ Remove token after verification
        await user.save();

        console.log("✅ Account verified for:", user.email);
        return res.status(200).json({ message: "Account successfully verified! You can now log in." });

    } catch (error) {
        console.error("❌ Verification error:", error);
        return res.status(500).json({ message: "Error verifying account." });
    }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
    console.log("✅ In login route");

    const { email, password } = req.body;
    console.log("🟢 Received credentials:", email);

    try {
        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({ message: "All fields are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ No user found for email:", email);
            return res.status(400).json({ message: "Invalid credentials." });
        }

        console.log("✅ User found in database:", user.email);

        // Ensure user is verified
        if (!user.isVerified) {
            console.log("❌ User is not verified:", user.email);
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password check result:", isMatch);

        if (!isMatch) {
            console.log("❌ Incorrect password for user:", user.email);
            return res.status(400).json({ message: "Invalid credentials." });
        }

        console.log("✅ Password matched!");

        // Remove password before sending response
        const userObject = user.toObject();
        delete userObject.password;

        console.log("🚀 Login successful for:", user.email);
        return res.status(200).json(userObject);

    } catch (error) {
        console.error("❌ Login error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
