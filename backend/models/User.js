const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    // 🔹 Basic Profile Information
    firstName: {
      type: String,
      required: true,
      trim: true, // Remove extra spaces
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensures username is unique
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      lowercase: true, // Converts email to lowercase
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // Email format validation
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password must be at least 6 characters long
    },
    phoneNumber: {
      type: String,
      required: false,
      validate: {
        validator: function (v) {
          return /^[0-9]{10,15}$/.test(v); // Ensures phone number format
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    // 🔹 Profile & Social Details
    profileImage: {
      type: String,
      default: "", // If no profile image is provided, use an empty string
    },
    bio: {
      type: String,
      maxlength: 300, // Short bio for the user
      default: "Follower of Christ ✝️",
    },
    church: {
      type: String,
      required: false,
      trim: true, // Church affiliation (optional)
    },
    ministry: {
      type: String, // Allow any input instead of predefined options
      trim: true,
      default: "",
    },
    twitterHandle: {
      type: String,
      trim: true,
      default: "", // Optional Twitter handle
    },
    instagramHandle: {
      type: String,
      trim: true,
      default: "", // Optional Instagram handle
    },
    location: {
      city: { type: String, trim: true },
      country: { type: String, trim: true },
    },

    // 🔹 Community Engagement
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who follow them
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users they follow
    sharedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }], // Shared posts/listings

    // 🔹 Privacy Settings
    privacySettings: {
      showEmail: { type: Boolean, default: false }, // Hide email from others
      showPhoneNumber: { type: Boolean, default: false }, // Hide phone number
      allowMessages: { type: Boolean, default: true }, // Allow direct messages
    },

    // 🔹 Account Verification
    verificationToken: { type: String, required: false },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false },

    // 🔹 Password Reset
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date },

    savedListings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      }
    ],
  },

  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

// Create the user model
const User = mongoose.model("User", userSchema);

module.exports = User;
