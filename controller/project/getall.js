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
  get: async (req, res) => {
    const projectResult = await project.findAll({})

    let projectList = []
    

    res.send('ok')
  },
};
