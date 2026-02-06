const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Tweet = require("../models/Tweet");
/**
 * GET /analytics/summary
 */
router.get("/summary", async (req, res) => {
  try {
    const tweets = await Tweet.find();

    const totalPosts = tweets.length;
    const totalLikes = tweets.reduce((sum, t) => sum + t.likes, 0);
    const totalReplies = tweets.reduce((sum, t) => sum + t.replies, 0);
    const totalRetweets = tweets.reduce((sum, t) => sum + t.retweets, 0);

    res.status(200).json({
      totalPosts,
      totalLikes,
      totalReplies,
      totalRetweets,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});
/**
 * GET /analytics/engagement-rate
 */
router.get("/engagement-rate", async (req, res) => {
  try {
    const tweets = await Tweet.find();

    let totalEngagement = 0;
    let totalImpressions = 0;

    tweets.forEach((t) => {
      totalEngagement += t.likes + t.replies + t.retweets;
      totalImpressions += t.impressions;
    });

    const rate =
      totalImpressions === 0
        ? 0
        : ((totalEngagement / totalImpressions) * 100).toFixed(2);

    res.status(200).json({
      engagementRate: rate + "%",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to calculate engagement rate",
    });
  }
});

/**
 * GET /analytics/daily-stats
 */
router.get("/daily-stats", async (req, res) => {
  try {
    const stats = await Tweet.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          totalLikes: { $sum: "$likes" },
          totalReplies: { $sum: "$replies" },
          totalRetweets: { $sum: "$retweets" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch daily stats",
    });
  }
});

/**
 * GET /analytics/top-post
 */
router.get("/top-post", async (req, res) => {
  try {
    const topTweet = await Tweet.findOne().sort({
      likes: -1,
      retweets: -1,
    });

    if (!topTweet) {
      return res.status(404).json({
        message: "No tweets found",
      });
    }

    res.status(200).json(topTweet);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch top post",
    });
  }
});


module.exports = router;
