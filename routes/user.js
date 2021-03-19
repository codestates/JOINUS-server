const express = require("express");
const router = express.Router();

const { userController } = require("../controller");

router.post("/login", userController.login.post);
router.post("/signup", userController.signup.post);

module.exports = router;
