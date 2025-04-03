const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Thought", "Image", "Poll", "Link", "Chat"],
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
    options: {
        type: [
          {
            text: { type: String, required: true },
          },
        ],
        default: [],
      },
      

    // Link type
    link: { type: String },
    linkDescription: { type: String },

    // Chat type
    chat: {
      name: String,
      description: String,
      supportsText: { type: Boolean, default: true },
      supportsAudio: { type: Boolean, default: false },
    },

    // list with people that liked the listing
    likedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // list with people that commented the listing and their comments
    commentedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        comment: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // list with people who has saved the listing
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]

  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
