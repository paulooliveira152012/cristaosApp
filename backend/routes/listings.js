const express = require("express");
const router = express.Router();
const Listing = require("../models/Listings");
const User = require("../models/User");

// Create a new listing
router.post("/newListing", async (req, res) => {
  console.log("📩 New listing route hit");

  const {
    type,
    title,
    image,
    imageDescription,
    question,
    options,
    link,
    linkDescription,
    chat,
    group,
    content,
    createdBy,
    createdAt,
    caption,
  } = req.body;

  console.log("🧾 Listing type:", type);
  console.log("👤 Created by:", createdBy);
  console.log("link:", link);
  console.log("Caption:", caption);

  console.log(req.body);

  try {
    let newListingData = {
      type,
      createdBy,
      createdAt: createdAt || new Date().toISOString(),
    };

    // Montar o objeto com base no tipo
    switch (type) {
      case "Thought":
        newListingData.title = title;
        newListingData.content = content;
        break;

      case "Image":
        newListingData.image = image;
        newListingData.caption = caption || "";
        break;

      case "Poll":
        newListingData.question = question;
        newListingData.options = options || [];
        break;

      case "Link":
        newListingData.link = link;
        newListingData.linkDescription = linkDescription || "";
        break;

      case "Chat":
        newListingData.chat = chat || {
          supportsText: true,
          supportsAudio: false,
        };
        newListingData.title = title;
        break;

      case "Group":
        newListingData.group = {
          name: group?.name || title,
          description: group?.description || "",
          chatType: group?.chatType || "text",
        };
        newListingData.title = title;
        break;

      default:
        return res.status(400).json({ message: "Tipo de listagem inválido." });
    }

    const newListing = new Listing(newListingData);
    const saved = await newListing.save();

    // 🔄 Adiciona à lista de "sharedListings" do usuário
    await User.findByIdAndUpdate(
      createdBy,
      { $push: { sharedListings: saved._id } },
      { new: true }
    );

    console.log("✅ New listing created:", saved);
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error creating listing:", error);
    res.status(500).json({ message: "Server error creating listing" });
  }
});

router.get("/getListings", async (req, res) => {
  console.log("Route to get listings reached");
  try {
    const listings = await Listing.find()
      .populate({
        path: "createdBy",
        select: "_id username profileImage",
      })
      .populate({
        path: "commentedBy.user", // 👈 isso popula o user dos comentários
        select: " _id username profileImage",
      })
      .populate({
        path: "commentedBy.replies.user",
        select: "_id username profileImage",
      })
      .populate({
        path: "savedBy",
        select: "_id", // ou também "username profileImage" se quiser mais info
      })
      
      .sort({ createdAt: -1 });

    res.status(200).json(listings);
  } catch (error) {
    console.error("❌ Error fetching listings:", error);
    res.status(500).json({ message: "Server error getting listings" });
  }
});

router.post("/likeListing", async (req, res) => {
  console.log("liking a listing");

  const { listingId, userId } = req.body;

  console.log("user liking listing:", userId, "listingId:", listingId);

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      console.log("listing not found")
      return res.status(404).json({ message: "Listing not found" });
    }

    const alreadyLiked = listing.likedBy.includes(userId);

    if (alreadyLiked) {
      // unlike
      console.log("removing like to listing")
      listing.likedBy = listing.likedBy.filter(
        (id) => id.toString() !== userId
      );
    } else {
      console.log("adding like from listing")
      listing.likedBy.push(userId);
    }

    await listing.save();
    console.log("Done!")

    res.status(200).json({
      message: alreadyLiked ? "Like removed" : "Listing Liked",
      likedBy: listing.likedBy,
    });
  } catch (error) {
    console.log("❌ Error liking listing");
    res.status(500).json({ message: "Server error liking listing" });
  }
});

router.post("/likeComment", async (req, res) => {
  const { listingId, commentId, userId } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ message: "Listing not found" });

  const comment = listing.commentedBy.id(commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  const alreadyLiked = comment.likedBy.includes(userId);
  if (alreadyLiked) {
    comment.likedBy.pull(userId);
  } else {
    comment.likedBy.push(userId);
  }

  await listing.save();

  // 🧠 Popula tudo o que precisa, inclusive os replies
  const updated = await Listing.findById(listingId)
    .populate("createdBy", "_id username profileImage")
    .populate("commentedBy.user", "_id username profileImage")
    .populate("commentedBy.replies.user", "_id username profileImage");

  res
    .status(200)
    .json({ message: "Comment like toggled", updatedListing: updated });
});

router.post("/addComment", async (req, res) => {
  console.log("📩 Rota de adicionar comentário chamada!");
  const { listingId, userId, commentText } = req.body;

  if (!listingId || !userId || !commentText) {
    console.log("❌ Dados incompletos para adicionar comentário");
    return res.status(400).json({ message: "Dados incompletos" });
  }

  try {
    // 1. Busca a listagem
    const listing = await Listing.findById(listingId);
    if (!listing)
      return res.status(404).json({ message: "Listing não encontrado" });

    // 2. Cria o comentário
    const newComment = {
      user: userId,
      commentText,
      createdAt: new Date(),
    };

    // 3. Adiciona e salva
    listing.commentedBy.push(newComment);
    await listing.save();

    // 4. Busca o comentário populado
    const updatedListing = await Listing.findById(listingId).populate({
      path: "commentedBy.user",
      select: "username profileImage", // adicione profileImage se quiser
    });

    const populatedComment = updatedListing.commentedBy.at(-1); // último comentário

    console.log("✅ Comentário populado retornado:", populatedComment);

    res.status(200).json(populatedComment);
  } catch (error) {
    console.error("❌ Erro ao adicionar comentário:", error);
    res.status(500).json({ message: "Erro do servidor" });
  }
});

// In routes/listings.js or wherever your routes are defined
router.post("/replyComment", async (req, res) => {
  const { listingId, parentCommentId, userId, replyText } = req.body;

  console.log("📨 Replying to comment:", {
    listingId,
    parentCommentId,
    userId,
    replyText,
  });

  if (!listingId || !parentCommentId || !userId || !replyText) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const comment = listing.commentedBy.id(parentCommentId); // Mongoose subdoc access

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replies = comment.replies || [];

    comment.replies.push({
      user: userId,
      replyText,
      createdAt: new Date(),
    });

    await listing.save();

    const updatedListing = await Listing.findById(listingId)
      .populate("createdBy", "_id username profileImage")
      .populate("commentedBy.user", "_id username profileImage")
      .populate("commentedBy.replies.user", "_id username profileImage");

    res.status(200).json({
      message: "Reply added",
      updatedListing,
    });
  } catch (error) {
    console.error("❌ Error replying to comment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/saveListing", async (req, res) => {
  console.log("🔗 Route for saving the listing reached");
  const { userId, listingId } = req.body;

  console.log("👤 userId saving the listing:", userId);
  console.log("📦 listingId:", listingId);

  if (!userId || !listingId) {
    console.log("🚫 Missing userId or listingId");
    return res.status(400).json({ message: "Missing userId or listingId" });
  }

  try {
    const user = await User.findById(userId);

    const listing = await Listing.findById(listingId)

    if (!user) {
      console.log("🚫 User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySaved = user.savedListings.includes(listingId);

    if (alreadySaved) {
      // ❌ Remove listing from saved
      user.savedListings = user.savedListings.filter(
        (id) => id.toString() !== listingId.toString()
      );

      listing.savedBy = listing.savedBy.filter(
        (id) => id.toString() !== userId.toString()
      );

      console.log("❌ Listing removed from saved");
    } else {
      // ✅ Add listing to saved
      user.savedListings.push(listingId);
      listing.savedBy.push(userId);
      console.log("✅ Listing added to saved");
    }

    await user.save();
    await listing.save();

    res.status(200).json({
      message: alreadySaved ? "Listing unsaved" : "Listing saved",
      savedListings: user.savedListings,
      listingSavedBy: listing.savedBy,
    });
  } catch (error) {
    console.error("❌ Error saving listing:", error);
    res.status(500).json({ message: "Server error saving listing" });
  }
});

module.exports = router;
