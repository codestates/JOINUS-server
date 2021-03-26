const models = require("../../models");
const { ref } = models;

module.exports = {
  post: async (req, res) => {
if(req.cookies.refreshToken){
    await ref.destroy({ where: { hashed: req.cookies.refreshToken } });
}
    res.clearCookie("refreshToken", {
          domain: "joinus.fun",
          path: "/",
          sameSite: "none",
          httpOnly: true,
          secure: true,
        }).send({ message: "logOut" });
  },
};
