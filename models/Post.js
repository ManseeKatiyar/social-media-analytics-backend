const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  platform: {
    type: String,
    enum: ["twitter", "instagram"],
    required: true
  },
  username: String,
  content: String,
  likes: Number,
  comments: Number,
  shares: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Post", postSchema);
