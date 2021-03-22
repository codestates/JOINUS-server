const { Sequelize } = require("sequelize");
const models = require("../../models");
const {
  user,
  stack,
  user_stack,
  project,
  project_stack,
  image,
  attendUser,
  portfolio,
} = models;

module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;

    const userInfo = await user.findOne({
      where: { userEmail: email, password: password },
    });

    if (!userInfo) {
      res.status(404).json({ message: "invalid user" });
    } else {
      res.json({
        accessToken: "accessToken",
        refreshToken: "refreshToken",
        userId: userInfo.dataValues.id,
        userName: userInfo.dataValues.userName,
        userEmail: email,
      });
    }
  },
};
