const axios = require("axios");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const models = require("../models");
const { user, ref } = models;

module.exports = async (req, res) => {
  let source = req.query.source;
  let userId = req.query.userId;

  let data = await ref.findOne({
    where: { hashed: req.cookies.refreshToken },
  });

  let refreshToken = data.dataValues.auth;

  if (source === "google") {
    axios({
      url: "https://oauth2.googleapis.com/token",
      method: "POST",
      params: {
        client_id: process.env.client_test,
        client_secret: process.env.client_secret,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
    })
      .then((result) => {
        res.send({ accessToken: result.data.access_token });
      })
      .catch(() => {
        res.status(403).send({ message: "refreshToken expired" });
      });
  } else {
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        res.status(403).send({ message: "refreshToken expired" });
      }
      if (decoded.exp - decoded.iat < 300) {
        res.status(403).send({ message: "refreshToken expired" });
      }
    });

    const userInfo = await user.findOne({
      where: { id: userId },
    });

    if (!userInfo) {
      res.status(404).json({ message: "invalid user" });
    } else {
      delete userInfo.dataValues.password;

      let access = jwt.sign(
        {
          ...userInfo.dataValues,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 3600,
        }
      );

      res.send({ data: { accessToken: access } });
    }
  }
};
