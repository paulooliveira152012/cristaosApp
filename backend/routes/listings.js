const express = require("express");
const router = express.Router();
const Listing = require("../models/Listings");

// Create a new listing
router.post("/newListing", async (req, res) => {
  console.log("📩 New listing route hit");
  
  const { type, title, image, question, options, link, chat, group, content, createdBy, createdAt } = req.body;

  console.log(createdBy, createdAt)

  try {
    const newListing = new Listing({
      type,
      title,
      image,
      question,
      options,
      link,
      chat,
      group,
      content,
      createdAt,
      createdBy
    });

    const saved = await newListing.save();

    console.log("✅ New listing created:", saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating listing:", error);
    res.status(500).json({ message: "Server error creating listing" });
  }
});

module.exports = router;
