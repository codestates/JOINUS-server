const models = require("../../models");
const { portfolio } = models;

module.exports = {
  post: async (req, res) => {
    const { userId, portfolio_urls } = req.body;

    if (!req.headers.authorization) {
      res.status(400).send({ message: "invalid access token" });
    } else if(!Array.isArray(portfolio_urls)) {
      res.status(404).send({ message: "data type error"})
    } else {
      await portfolio.destroy({ where: { userId: userId } });

      portfolio_urls.forEach(async (el) => {
        await portfolio.create({
          userId: userId,
          portfolio: el,
        });
      });

      res.send({ message: "updated your portfolio" });
    }
  },
};
