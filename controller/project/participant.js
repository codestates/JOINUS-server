const models = require("../../models");
const { user, attendUser } = models;

module.exports = {
  post: async (req, res) => {
    const { projectId } = req.body;

    if (!req.headers.authorization) {
      res.status(400).json({ message: "invalid access token" });
    } else {
      let data = await attendUser.findAll({
        where: { projectId: projectId, state: "waiting" },
        include: [{
          model: user
        }]
      });

      let participant = []

      data.forEach(el => {
        participant.push(el.user.dataValues.userEmail)
      })

      res.send({ data: participant });
    }
  },
};
