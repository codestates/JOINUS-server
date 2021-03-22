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

      let stacks = [];
      let portfolios = [];

      userData.stack.forEach((el) => {
        stacks.push(el.dataValues.stackName);
      });

      userData.portfolio.forEach((el) => {
        portfolios.push(el.dataValues.portfolio);
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
            projectName: el.dataValues.attendProject.projectName,
          });
        } else if (el.dataValues.state === "waitingProject") {
          waitingProject.push({
            projectName: el.dataValues.attendProject.projectName,
          });
        } else if (el.dataValues.checked !== "checked") {
          rejectProject.push({
            projectName: el.dataValues.attendProject.projectName,
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
        acceptProject: acceptProject,
        rejectProject: rejectProject,
        waitingProject: waitingProject,
      };

      res.send({ data: resData });
    }
  },
};
