const models = require("../../models");
const { portfolio } = models;

module.exports = {
  post: async (req, res) => {
    if (!req.headers.authorization) {
      res.status(400).send({ message: "invalid access token" });
    } else {
      const userId = req.body.userId;

      let data = await portfolio.findAll({ where: { userId: userId } });
      let portfolioList = [];

      data.forEach((el) => {
        portfolioList.push(el.dataValues.portfolio);
      });

      res.send({ data: portfolioList });
    }
  },
};
