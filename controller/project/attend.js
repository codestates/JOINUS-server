const models = require("../../models");
const { attendUser } = models;

module.exports = {
  post: async (req, res) => {
    const { userId, projectId } = req.body;

    if (!req.headers.authorization) {
      res.status(400).json({ message: "invalid access token" });
    } else {
      await attendUser.findOrCreate({
        where: { userId: userId, projectId: projectId },
        defaults: {
          state: "waiting",
        },
      });

      res.send({ message: "attend" });
    }
  },
};
