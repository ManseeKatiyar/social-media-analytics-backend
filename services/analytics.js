const Post = require("../models/Post");

exports.getSummary = async () => {
  const result = await Post.aggregate([
    {
      $group: {
        _id: null,
        totalPosts: { $sum: 1 },
        totalLikes: { $sum: "$likes" },
        totalComments: { $sum: "$comments" },
        totalShares: { $sum: "$shares" }
      }
    }
  ]);

  const data = result[0] || {
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalShares: 0
  };

  const engagementRate =
    data.totalPosts === 0
      ? 0
      : (
          (data.totalLikes + data.totalComments + data.totalShares) /
          data.totalPosts
        ).toFixed(2);

  return { ...data, engagementRate };
};
