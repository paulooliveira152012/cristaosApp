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
// Login Route
router.post("/login", async (req, res) => {
    console.log("✅ In login route");

    const { email, password } = req.body;
    console.log("🟢 Received credentials:", email, password);

    try {
        if (!email || !password) {
            console.log("❌ Missing email or password");
            return res.status(400).json({ message: "Todos os campos são necessários" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ No user found for email:", email);
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        console.log("✅ User found in database:", user.email);

        // Ensure user is verified
        if (!user.isVerified) {
            console.log("❌ User is not verified:", user.email);
            return res.status(403).json({ message: "Verifique sua conta antes de fazer login." });
        }

        // Compare password
        let isMatch = false;
        try {
            isMatch = await bcrypt.compare(password, user.password);
            console.log("🔍 Password check result:", isMatch);
        } catch (err) {
            console.error("❌ Error comparing password:", err);
            return res.status(500).json({ message: "Erro interno ao verificar senha" });
        }

        if (!isMatch) {
            console.log("❌ Incorrect password for user:", user.email);
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        console.log("✅ Password matched!");

        // Remove password before sending response
        const userObject = user.toObject();
        delete userObject.password;

        console.log("🚀 Login successful for:", user.email);
        return res.status(200).json(userObject);

    } catch (error) {
        console.error("❌ Login error caught:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
});



module.exports = router;