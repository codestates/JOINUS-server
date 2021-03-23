const models = require("../../models");
const { attendUser } = models;

module.exports = {
  post: async (req, res) => {
    const { userId, projectId } = req.body;

    if (!req.headers.authorization) {
      res.status(400).json({ message: "invalid access token" });
    } else {
      await attendUser.update(
        { checked: "checked" },
        { where: { userId: userId, projectId: projectId } }
      );

      res.send({ message: "check" });
    }
  },
};
