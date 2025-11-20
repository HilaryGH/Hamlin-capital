// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only if not using Google OAuth
    },
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },

  role: {
    type: String,
    enum: ["user", "admin", "investor", "startup"],
    default: "user",
  },
  uploadedFiles: [String],
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("User", userSchema);
