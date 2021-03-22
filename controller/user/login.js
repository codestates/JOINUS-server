const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const models = require("../../models");
const { user, ref } = models;

module.exports = {
  authlogin: async (req, res) => {
    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.client_test,
        process.env.client_secret,
        process.env.redirect_uris
      );

      const code = req.body.authorizationCode;

      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: "get",
        headers: {
          authorization: `Bearer ${tokens.access_token}`,
        },
      }).then(async (response) => {
        const userInfo = await user.findOrCreate({
          where: { userEmail: response.data.email },
          defaults: {
            userName: response.data.name,
          },
        });

        let refIdx = await ref.create({
          auth: tokens.refresh_token,
        });

        const hashed = crypto
          .createHmac("sha256", process.env.SHA_SECRET)
          .update(String(refIdx.dataValues.id))
          .digest("hex");

        await ref.update(
          {
            hashed: hashed,
          },
          { where: { id: refIdx.dataValues.id } }
        );

        res
          .cookie("refreshToken", hashed, {
            domain: "joinus.fun",
            path: "/",
            sameSite: "none",
            httpOnly: true,
            secure: true,
          })
          .send({
            accessToken: tokens.access_token,
            userId: userInfo[0].dataValues.id,
            userName: userInfo[0].dataValues.userName,
            userEmail: userInfo[0].dataValues.userEmail,
            source: "google",
          });
      });
    } catch {
      res.status(404).send("something wrong");
    }
  },

  post: async (req, res) => {
    const { userEmail, password } = req.body;

    const hashed = crypto
      .createHmac("sha256", process.env.SHA_SECRET)
      .update(password)
      .digest("hex");

    const userInfo = await user.findOne({
      where: { userEmail: userEmail, password: hashed },
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

      let refresh = jwt.sign(
        {
          userId: userInfo.dataValues.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 50400,
        }
      );

      let refIdx = await ref.create({
        auth: refresh,
      });

      const hashed = crypto
        .createHmac("sha256", process.env.SHA_SECRET)
        .update(refIdx.dataValues.id)
        .digest("hex");

      await ref.update(
        {
          hashed: hashed,
        },
        { where: { id: refIdx.dataValues.id } }
      );

      res
        .cookie("refreshToken", hashed, {
          domain: "joinus.fun",
          path: "/",
          sameSite: "none",
          httpOnly: true,
          secure: true,
        })
        .json({
          data: {
            accessToken: access,
            userId: userInfo.dataValues.id,
            userName: userInfo.dataValues.userName,
            userEmail: userEmail,
            source: "joinus",
          },
        });
    }
  },
};
