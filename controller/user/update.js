const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const models = require("../../models");
const { user, user_stack } = models;

module.exports = {
  post: async (req, res) => {
    const { userId, password, company, profileImage, stacks } = req.body;
    if (!req.headers.authorization) {
      res.status(400).json({ data: null, message: "invalid access token" });
    } else {
      const hashed = crypto
        .createHmac("sha256", process.env.SHA_SECRET)
        .update(password)
        .digest("hex");

      await user.update(
        { where: { id: userId } },
        { password: hashed, profileImage: profileImage, company: company }
      );

      await user_stack.destroy({ where: { userId: userId } });

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

      res.send({ message: "updated your data" });
    }
  },
};
