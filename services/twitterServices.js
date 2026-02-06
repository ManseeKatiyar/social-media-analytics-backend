const axios = require("axios");

const twitterClient = axios.create({
  baseURL: "https://api.twitter.com/2",
  headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
});

const getUserTweets = async (username) => {
  const userRes = await twitterClient.get(`/users/by/username/${username}`);
  const userId = userRes.data.data.id;

  const tweetsRes = await twitterClient.get(
    `/users/${userId}/tweets?max_results=10&tweet.fields=public_metrics`
  );

  return tweetsRes.data.data || [];
};

module.exports = { getUserTweets };
