const express = require("express");
const router = express.Router();
const Room = require("../models/Rooms.js");

router.post("/newRoom", async (req, res) => {
  const { title, coverImage, createdBy, createdAt } = req.body;

  console.log(`🟢 creating new room with ${title}, ${coverImage}, ${createdBy}, ${createdAt}`);

  const newRoom = new Room({
    title,
    coverImage,
    createdBy,
    createdAt, // opcional, dependendo do seu schema
  });

  try {
    const savedRoom = await newRoom.save();
    console.log("✅ Sala salva no banco:", savedRoom);
    res.status(201).json({ message: "Sala criada com sucesso!", room: savedRoom });
  } catch (error) {
    console.error("❌ Erro ao criar sala:", error);
    res.status(500).json({ error: "Erro ao criar a sala. Tente novamente." });
  }
});

module.exports = router;
