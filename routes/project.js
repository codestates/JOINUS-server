const express = require("express");
const router = express.Router();

const { projectController } = require("../controller");

router.get("/all", projectController.getall.get);
router.post("/testpost", projectController.testpost.post);

module.exports = router;
