const models = require("../../models");
const { stack, project, project_stack, image } = models;

module.exports = {
  post: async (req, res) => {
    const {
      userId,
      projectName,
      projectDesc,
      attendExpired,
      projectStacks,
      level,
    } = req.body;

    const projectData = await project.create({
      projectName: projectName,
      projectDesc: projectDesc,
      attendExpired: attendExpired,
      userId: userId,
      level: level,
    });

    let projectId = projectData.dataValues.id;

    await image.create({
      projectId: projectId,
      image_url: req.imgPath,
    });
let stackArr = projectStacks.split(',')

    let stackData = await stack.findAll({
      where: { stackName: stackArr },
    });

    stackData.forEach(async (stackId) => {
      await project_stack.create({
        projectId: projectId,
        stackId: stackId.dataValues.id,
      });
    });

    res.send({ message: "created your project" });
  },
};
