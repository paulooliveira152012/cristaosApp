// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { populate } = require("../models/Listings");

// ✅ Buscar todos os usuários (para Explore / Buscar)
router.get("/getAllUsers", async (req, res) => {
  console.log("fetching all users")
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
    const user = await User.findById(req.params.id) // se quiser selecionar apenas alguns usar: .select(" firstName lastName... ")
    // populate the listings they have saved by searching it by its ID
    .populate({
      path: "savedListings",
      populate: {
        path: "createdBy",
        select: "username profileImage _id"
      }
    });
    if (!user) {
      console.log("user not found!")
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    console.log("user found:", user)
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});


module.exports = router;
