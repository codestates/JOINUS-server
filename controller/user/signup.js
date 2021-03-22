const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const models = require("../../models");
const { user, stack, user_stack, portfolio } = models;

module.exports = {
  post: async (req, res) => {
    const {
      userEmail,
      password,
      userName,
      company,
      portfolios,
      stacks,
      profileImage,
    } = req.body;

    if (!userEmail || !password || !userName) {
      res.status(403).send({ message: "insufficient parameters supplied" });
    } else {
      let existData = await user.findOne({
        where: { userEmail: userEmail },
      });

      if (existData) {
        res.status(409).json({ message: "exist email" });
      }

      const hashed = crypto
        .createHmac("sha256", process.env.SHA_SECRET)
        .update(password)
        .digest("hex");

      let userData = await user.create({
        userEmail: userEmail,
        userName: userName,
        password: hashed,
        profileImage: profileImage,
        company: company,
      });

      let userId = userData.dataValues.id;

      if (portfolios.length > 0) {
        portfolios.forEach(async (el) => {
          await portfolio.create({
            userId: userId,
            portfolio: el,
          });
        });
      }

      if (stacks.length > 0) {
        let stackData = await stack.findAll({
          where: { stackName: stacks },
        });

        stackData.forEach(async (el) => {
          await user_stack.create({
            userId: userId,
            stackId: el.dataValues.id,
          });
        });
      }
      res.send({ message: "welcome dev!" });
    }
  },
};
