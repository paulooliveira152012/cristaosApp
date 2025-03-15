const express = require('express');
const router = express.Router();

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
