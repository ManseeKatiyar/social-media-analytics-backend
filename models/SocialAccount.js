const mongoose = require("mongoose");

const SocialAccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  platform: {
    type: String,
    enum: ["twitter", "instagram"],
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: String,
  connectedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SocialAccount", SocialAccountSchema);
