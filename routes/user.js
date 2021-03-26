const express = require("express");
const router = express.Router();

const { userController } = require("../controller");

router.post("/login", userController.login.post);
router.post("/authlogin", userController.login.authlogin);
router.post("/signup", userController.signup.post);
router.post("/info", userController.info.post);
router.post("/update", userController.update.post);
router.post("/logout", userController.logout.post);

module.exports = router;
