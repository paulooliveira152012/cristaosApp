const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Post", "Imagem", "Enquete", "Link", "Chat", "Grupo"],
    },

    // Common fields
    title: { type: String },
    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Post type
    content: { type: String },

    // Image type
    image: { type: String },
    caption: { type: String },

    // Poll type
    question: { type: String },
    options: [
      {
        text: String,
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],

    // Link type
    link: { type: String },
    linkComment: { type: String },

    // Chat type
    chat: {
      name: String,
      description: String,
      supportsText: { type: Boolean, default: true },
      supportsAudio: { type: Boolean, default: false },
    },

    // Group type
    group: {
      name: String,
      description: String,
      chatType: {
        type: String,
        enum: ["text", "audio"],
        default: "text",
      },
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

