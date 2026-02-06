const router = require("express").Router();
const Post = require("../models/Post");

router.post("/twitter", async (req, res) => {
  await Post.insertMany([
    {
      platform: "twitter",
      username: "elonmusk",
      content: "Hello Twitter",
      likes: 1200,
      comments: 300,
      shares: 150
    },
    {
      platform: "twitter",
      username: "openai",
      content: "AI is changing the world",
      likes: 2400,
      comments: 500,
      shares: 400
    }
  ]);

  res.json({ message: "Mock Twitter data inserted" });
});

module.exports = router;
