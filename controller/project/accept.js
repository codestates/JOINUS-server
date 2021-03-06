const models = require("../../models");
const { user, attendUser } = models;

module.exports = {
  post: async (req, res) => {
    const { attendUserEmail, projectId } = req.body;

    if (!req.headers.authorization) {
      res.status(400).json({ message: "invalid access token" });
    } else {
      let data = await user.findOne({
        where: { userEmail: attendUserEmail },
      });

      await attendUser.update(
        { state: "accept" },
        { where: { userId: data.dataValues.id, projectId: projectId } }
      );

      res.send({ message: "accept" });
    }
  },
};
