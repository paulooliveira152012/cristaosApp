const express = require("express");
const router = express.Router();
const Listing = require("../models/Listings");

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
      .sort({ createdAt: -1 }); // opcional: mais recente primeiro
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
      return res.status(404).json({ message: "Listing not found" });
    }

    const alreadyLiked = listing.likedBy.includes(userId);

    if (alreadyLiked) {
      // unlike
      listing.likedBy = listing.likedBy.filter(
        (id) => id.toString() !== userId
      );
    } else {
      listing.likedBy.push(userId);
    }

    await listing.save();

    res.status(200).json({
      message: alreadyLiked ? "Like removed" : "Listing Liked",
      likedBy: listing.likedBy,
    });
  } catch (error) {
    console.log("❌ Error liking listing");
    res.status(500).json({ message: "Server error liking listing" });
  }
});

module.exports = router;
