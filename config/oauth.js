const qs = require("qs");

const TWITTER_AUTH_URL = "https://twitter.com/i/oauth2/authorize";

exports.getTwitterAuthURL = () => {
  const params = {
    response_type: "code",
    client_id: process.env.TWITTER_CLIENT_ID,
    redirect_uri: process.env.TWITTER_CALLBACK_URL,
    scope: "tweet.read users.read offline.access",
    state: "state123",
    code_challenge: "challenge",
    code_challenge_method: "plain"
  };

  return `${TWITTER_AUTH_URL}?${qs.stringify(params)}`;
};
