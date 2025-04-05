// routes/groups.js
const express = require("express");
const router = express.Router();
const Group = require("../models/Groups");

router.post("/newGroup", async (req, res) => {
  try {
    const { name, description, chatType, createdBy } = req.body;

    const group = new Group({
      name,
      description,
      chatType,
      createdBy,
      members: [createdBy], // já adiciona o criador como membro
    });

    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error("Erro ao criar grupo:", err);
    res.status(500).json({ error: "Erro ao criar grupo" });
  }
});



// ✅ Buscar todos os grupos
router.get("/getGroups", async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("createdBy", "_id username profileImage") // opcional
      .sort({ createdAt: -1 });

    res.status(200).json(groups);
  } catch (err) {
    console.error("Erro ao buscar grupos:", err);
    res.status(500).json({ error: "Erro ao buscar grupos" });
  }
});

module.exports = router;
