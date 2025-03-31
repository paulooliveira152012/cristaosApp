const express = require("express");
const router = express.Router();
const Room = require("../models/Rooms.js");

// create a new room
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

// fetch all rooms
router.get("/getRooms", async (req, res) => {
    console.log("📥 Buscando todas as salas...");
  
    try {
      const rooms = await Room.find().sort({ createdAt: -1 }).populate("createdBy", "username"); // opcional: populate se 'createdBy' for ref de User
      res.status(200).json(rooms);
    } catch (error) {
      console.error("❌ Erro ao buscar salas:", error);
      res.status(500).json({ error: "Erro ao buscar as salas. Tente novamente." });
    }
  });
  

module.exports = router;
