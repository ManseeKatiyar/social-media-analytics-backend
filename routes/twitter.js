const router = require("express").Router();
const Tweet = require("../models/Tweet");

router.post("/seed", async (req, res) => {
  try {
    await Tweet.deleteMany(); // reset data

    const mockTweets = [
      {
        content: "Learning MERN stack 🚀",
        likes: 120,
        replies: 15,
        retweets: 30,
        impressions: 1000,
      },
      {
        content: "Backend projects boost interviews",
        likes: 90,
        replies: 10,
        retweets: 20,
        impressions: 800,
      },
      {
        content: "MongoDB + Express = ❤️",
        likes: 150,
        replies: 25,
        retweets: 45,
        impressions: 1200,
      },
    ];

    await Tweet.insertMany(mockTweets);

    res.status(201).json({ message: "Tweets seeded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed tweets" });
  }
});

module.exports = router;
