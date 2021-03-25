const models = require("../../models");
const { stack, project, project_stack, image } = models;

module.exports = {
  post: async (req, res) => {
    if (!req.headers.authorization) {
      res.status(400).json({ message: "invalid access token" });
    } else {
      const {
        userId,
        projectName,
        projectDesc,
        attendExpired,
   //     image_urls,
        projectStacks,
        level,
      } = req.body;
let image_urls = []

      const projectData = await project.create({
        projectName: projectName,
        projectDesc: projectDesc,
        attendExpired: attendExpired,
        userId: userId,
        level: level,
      });

      let projectId = projectData.dataValues.id;

      image_urls.forEach(async (image_url) => {
        await image.create({
          projectId: projectId,
          image_url: image_url,
        });
      });

      let stackData = await stack.findAll({
        where: { stackName: projectStacks },
      });

      stackData.forEach(async (stackId) => {
        await project_stack.create({
          projectId: projectId,
          stackId: stackId.dataValues.id,
        });
      });

      res.send({ message: "created your project" });
    }
  },
};
