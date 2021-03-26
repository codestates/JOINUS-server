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
    let stacks = [];

    data.stacks.forEach((el) => {
      stacks.push(el.dataValues.stackName);
    });
let thumbnail = ''
if(data.dataValues.images){
thumbnail = 'img/' + data.dataValues.images[0].dataValues.image_url
}

    res.send({
      data: {
        projectId: data.dataValues.id,
        projectName: data.dataValues.projectName,
        writeUser: data.writeUser.dataValues.userName,
        createdAt: data.dataValues.createdAt,
        attendExpired: data.dataValues.attendExpired,
        projectDesc: data.dataValues.projectDesc,
        level: data.dataValues.level,
        thumbnail: thumbnail,
        stacks: stacks,
        attendCount: attendCount,
      },
    });
  },
};
