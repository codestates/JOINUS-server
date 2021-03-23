const models = require("../../models");
const { ref } = models;

module.exports = {
  get: async (req, res) => {
    await ref.destroy({ where: { hashed: req.cookies.refreshToken } });
    res.clearCookie("refreshToken").send({ message: "logOut" });
  },
};
