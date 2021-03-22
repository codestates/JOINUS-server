const express = require("express");
const router = express.Router();

const { portfolioController } = require("../controller");

router.post("/update", portfolioController.update.post);
router.post("/info", portfolioController.info.post);

module.exports = router;
