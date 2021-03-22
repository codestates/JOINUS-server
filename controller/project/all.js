const models = require("../../models");
const { user, stack, project, image } = models;

module.exports = {
  get: async (req, res) => {
    const projectData = await project.findAll({
      include: [
        { model: user, as: "writeUser" },
        { model: user, as: "attendPerson" },
        { model: stack },
        { model: image },
      ],
    });

    let projectList = [];

    projectData.forEach((el) => {
      let stackList = [];
      el.dataValues.stacks.forEach((stack) => {
        if (stack.length !== 0) {
          stackList.push(stack.dataValues.stackName);
        }
      });

      projectList.push({
        projectId: el.dataValues.id,
        projectName: el.dataValues.projectName,
        attendExpired: el.dataValues.attendExpired,
        writeUser: el.dataValues.writeUser.dataValues.userName,
        level: el.dataValues.level,
        stack: stackList,
        attendCount: el.dataValues.attendPerson.length,
        thumbnail: el.dataValues.images[0].dataValues.image_url,
      });
    });

    res.send({ data: projectList });
  },
};
