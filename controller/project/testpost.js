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
    const { userName, projectName, projectDesc, expired } = req.body;

    const findUser = await user.findOne({
      where: { userName: userName },
    });

    let userId = findUser.dataValues.id;

    const projectResult = await project.create({
      projectName: projectName,
      projectDesc: projectDesc,
      attendExpired: expired,
      userId: userId,
    });

    let projectId = projectResult.dataValues.id;

    res.send(`id is ${projectId}`);
  },
};
