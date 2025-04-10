// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ✅ Buscar todos os usuários (para Explore / Buscar)
router.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({}, "_id username name profileImage") // retorna apenas os campos úteis
      .sort({ username: 1 }); // ordena por nome

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// Exemplo no Express
router.get("/getUser/:id", async (req, res) => {
  console.log("✅ ROTA de usuario unico encontrada")
  try {
    const user = await User.findById(req.params.id).select("username name profileImage bio");
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});


module.exports = router;
