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

module.exports = router;
