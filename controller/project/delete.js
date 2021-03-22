const models = require("../../models");
const { project } = models;

module.exports = {
  post: async (req, res) => {
    const { userId, projectId } = req.body;

    if (!req.headers.authorization) {
      res.status(400).json({ message: "invalid access token" });
    } else {
      await project.destroy({ where: { id: projectId, userId: userId } });

      res.send({ message: "deleted your project" });
    }
  },
};
