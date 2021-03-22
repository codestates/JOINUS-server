const models = require("../../models");
const { portfolio } = models;

module.exports = {
  post: async (req, res) => {
    if (!req.headers.authorization) {
      res.status(400).send({ message: "invalid access token" });
    } else {
      const { userId, portfolio_urls } = req.body;

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
