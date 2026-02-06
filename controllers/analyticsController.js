const Post = require("../models/Post");

exports.getSummary = async (req, res) => {
  const posts = await Post.find({ platform: "twitter" });

  const totalLikes = posts.reduce((sum, p) => sum + p.likes, 0);
  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);
  const totalShares = posts.reduce((sum, p) => sum + p.shares, 0);

  res.json({
    totalPosts: posts.length,
    totalLikes,
    totalComments,
    totalShares
  });
};
