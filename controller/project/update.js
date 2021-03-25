const models = require("../../models");
const { stack, project, project_stack, image } = models;

module.exports = {
  post: async (req, res) => {
    let {
      projectId,
      projectName,
      projectDesc,
      projectStacks,
//      image_urls,
      attendExpired,
      level,
    } = req.body;
let image_urls = []
    let stringBody = [projectDesc, attendExpired, level];
    let arrBody = [projectStacks, image_urls];

    stringBody = stringBody.map((el) => {
      if (!el) {return ""} else {return el};
    });
    arrBody = arrBody.map((el) => {
      if (!el) {return []} else {return el};
    });

    [projectDesc, attendExpired, level] = stringBody;
    [projectStacks, image_urls] = arrBody;

    if (!req.headers.authorization) {
      res.status(400).json({ data: null, message: "invalid access token" });
    } else {
      await project.update(
        {
          projectName: projectName,
          projectDesc: projectDesc,
          attendExpired: attendExpired,
          level: level,
        },
        { where: { id: projectId } }
      );

      await project_stack.destroy({ where: { projectId: projectId } });

      let stackData = await stack.findAll({
        where: { stackName: projectStacks },
        attributes: ["id"],
      });

      stackData.forEach(async (el) => {
        await project_stack.create({
          projectId: projectId,
          stackId: el.dataValues.id,
        });
      });

      await image.destroy({ where: { projectId: projectId } });

      image_urls.forEach(async (image_url) => {
        await image.create({
          projectId: projectId,
          image_url: image_url,
        });
      });

      res.send({ message: "updated your project" });
    }
  },
};
