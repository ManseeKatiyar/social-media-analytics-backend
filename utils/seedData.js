const mongoose = require("mongoose");
require("dotenv").config();

const Post = require("../models/Post");

async function seedData() {
  await mongoose.connect(process.env.MONGO_URI);

  await Post.deleteMany();

  await Post.insertMany([
    {
      userId: new mongoose.Types.ObjectId(),
      platform: "twitter",
      content: "Learning analytics 🚀",
      likes: 120,
      comments: 30,
      shares: 15
    },
    {
      userId: new mongoose.Types.ObjectId(),
      platform: "instagram",
      content: "Dashboard design 📊",
      likes: 200,
      comments: 50,
      shares: 25
    }
  ]);

  console.log("Mock data inserted");
  process.exit();
}

seedData();
