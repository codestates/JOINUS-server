const axios = require("axios");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  let source = req.body.source;
  let userId = req.body.userId;
  let auth = req.headers.authorization.split("Bearer ")[1];
  let result = true

  if (source === "joinus") {
    jwt.verify(auth, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        result = false
      } else if (decoded.exp - decoded.iat < 300) {
        result = false
      };
    });
  } else {
    await axios({
      url: `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${auth}`,
    })
      .then((res) => {
        if (res.data.expires_in < 300) {
          result = false;
        }
      })
      .catch((err) => {
        result = false;
      });
  }
  return result;
};
