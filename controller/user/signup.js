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
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(403).json({ message: "insufficient parameters supplied" });
    } else {
      await user.create({
        userEmail: email,
        userName: name,
        password: password,
      });

      res.send({ message: "welcome dev!" });
    }
  },
};
