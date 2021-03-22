const models = require("../../models");
const { user, stack, project, image } = models;

module.exports = {
  post: async (req, res) => {
    const { projectId } = req.body;

    const data = await project.findOne({
      where: { id: projectId },
      include: [
        { model: user, as: "attendPerson" },
        { model: user, as: "writeUser" },
        { model: stack },
        { model: image },
      ],
    });
    let attendCount = data.dataValues.attendPerson.length;
    let images = [];
    let stacks = [];

    data.stacks.forEach((el) => {
      stacks.push(el.dataValues.stackName);
    });

    data.images.forEach((el) => {
      images.push(el.dataValues.image_url);
    });

    res.send({
      data: {
        projectId: data.dataValues.id,
        projectName: data.dataValues.projectName,
        writeUser: data.writeUser.dataValues.userName,
        createdAt: data.dataValues.createdAt,
        attendExpired: data.dataValues.attendExpired,
        projectDesc: data.dataValues.projectDesc,
        level: data.dataValues.level,
        images: images,
        stacks: stacks,
        attendCount: attendCount,
      },
    });
  },
};
