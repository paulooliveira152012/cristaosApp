const express = require('express');
const router = express.Router();
const User = require('../models/User.js'); // Import User model
const bcrypt = require('bcryptjs');


// Sign up
// ✅ Signup Route (MongoDB + Hashed Password)
router.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    console.log(`email: ${email}, username: ${username}, password: ${password}`)
    console.log("Signup API reached with:", email, password);

    try {
        // Validation check
        if (!email || !password || !password) {
            console.loh("Missing fields!")
            return res.status(400).json({ success: false, message: "Missing email or password" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("user already exists")
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("password encrypted")

        // Create and save new user
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        console.log("new user created!")

        return res.status(201).json({ success: true, message: "Account created successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// Login Route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log("Login API reached with:", email, password);

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Missing email or password" });
    }

    // Mock authentication check
    if (email === "test@example.com" && password === "password123") {
        return res.json({ success: true, message: "Login successful" });
    } else {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});



module.exports = router;