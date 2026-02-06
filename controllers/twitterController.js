const Tweet = require("../models/Tweet");
const mockTweets = require("../data/mockTweets");

exports.seedTweets = async (req, res) => {
  await Tweet.deleteMany({ userId: req.user.id });

  const tweets = mockTweets.map(tweet => ({
    ...tweet,
    userId: req.user.id
  }));

  await Tweet.insertMany(tweets);

  res.json({ message: "Mock tweets added successfully" });
};

exports.getTweets = async (req, res) => {
  const tweets = await Tweet.find({ userId: req.user.id });

  res.json({
    username: req.user.email,
    totalTweets: tweets.length,
    tweets
  });
};
