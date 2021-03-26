const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const models = require("../../models");
const { user, stack, project, image } = models;

module.exports = {
  post: async (req, res) => {
    let { stacks, dropBox, searchValue, levels } = req.body;
    let projectData;
/*
    if (stacks.length === 0) {
      stacks = [];
      let allStack = await stack.findAll({
        attributes: ["stackName"],
      });
      allStack.forEach((el) => {
        stacks.push(el.dataValues.stackName);
      });
    }

    if (levels.length === 0) {
      levels = ["Beginner", "Intermediate", "Advanced"];
    }
*/
    if (dropBox === "writer") {
      projectData = await project.findAll({
        include: [
          {
            model: user,
            as: "writeUser",
            where: { userName: { [Op.like]: `%${searchValue}%` } },
            attributes: ["userName"],
          },
          { model: user, as: "attendPerson" },
          {
            model: stack,
            attributes: ["stackName"],
          },
          { model: image },
        ],
      });
    } else if (dropBox === "projectName") {
      projectData = await project.findAll({
        where: {
          projectName: {
            [Op.like]: `%${searchValue}%`,
          },
        },
        include: [
          {
            model: user,
            as: "writeUser",
            attributes: ["userName"],
          },
          { model: user, as: "attendPerson" },
          {
            model: stack,
            attributes: ["stackName"],
          },
          { model: image },
        ],
      });
    } else {
      projectData = await project.findAll({
        include: [
          {
            model: user,
            as: "writeUser",
            attributes: ["userName"],
          },
          { model: user, as: "attendPerson" },
          {
            model: stack,
            attributes: ["stackName"],
          },
          { model: image },
        ],
      });
    }

    let projectList = [];
    projectData.forEach((el) => {
      let stackList = [];
      el.dataValues.stacks.forEach((stack) => {
        if (stack.length !== 0) {
          stackList.push(stack.dataValues.stackName);
        }
      });

      let thumbnail = "";
      if (el.images[0]) {
        thumbnail = 'img/' + el.images[0].dataValues.image_url;
      }

      projectList.push({
        projectId: el.dataValues.id,
        projectName: el.dataValues.projectName,
        attendExpired: el.dataValues.attendExpired,
        writeUser: el.dataValues.writeUser.dataValues.userName,
        level: el.dataValues.level,
        stack: stackList,
        attendCount: el.dataValues.attendPerson.length,
        thumbnail: thumbnail,
      });
    });

    res.send({ data: projectList });
  },
};
