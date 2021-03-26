const models = require("../../models");
const { user, stack, portfolio, project, attendUser } = models;

module.exports = {
  post: async (req, res) => {

    if (!req.headers.authorization) {
      res.status(400).json({ data: null, message: "invalid access token" });
    } else {
      let userId = req.body.userId;

      let userData = await user.findOne({
        where: { id: userId },
        include: [
          { model: stack },
          { model: portfolio },
          { model: project, as: "myProject" },
          { model: project, as: "attendProject" },
        ],
      });

      let myProject = [];
      let stacks = [];
      let portfolios = [];

      userData.stacks.forEach((el) => {
        stacks.push(el.dataValues.stackName);
      });

      userData.portfolios.forEach((el) => {
        portfolios.push(el.dataValues.portfolio);
      });

      userData.myProject.forEach((el) => {
        myProject.push({
          projectName: el.dataValues.projectName,
          projectId: el.dataValues.id,
        });
      });
      let attendData = await attendUser.findAll({
        where: { userId: userId },
        include: [{ model: project }],
      });

      let acceptProject = [];
      let rejectProject = [];
      let waitingProject = [];

      attendData.forEach((el) => {
        if (el.dataValues.state === "accept") {
          acceptProject.push({
            projectName: el.project.dataValues.projectName,
            projectId: el.project.dataValues.id
          });
        } else if (el.dataValues.state === "waiting") {
          waitingProject.push({
            projectName: el.project.dataValues.projectName,
            projectId: el.project.dataValues.id
          });
        } else if (el.dataValues.checked !== "checked") {
          rejectProject.push({
            projectName: el.project.dataValues.projectName,
            projectId: el.project.dataValues.id
          });
        }
      });

      let resData = {
        userId: userId,
        userName: userData.dataValues.userName,
        userEmail: userData.dataValues.userEmail,
        profileImage: userData.dataValues.profileImage,
        portfolio: portfolios,
        stack: stacks,
        myProject: myProject,
        acceptProject: acceptProject,
        rejectProject: rejectProject,
        waitingProject: waitingProject,
      };

      res.send({ data: resData });
    }
  },
};
