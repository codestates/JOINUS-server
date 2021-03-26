const express = require("express");
const router = express.Router();

const { projectController } = require("../controller");

router.get("/all", projectController.all.get);
router.post("/search", projectController.search.post);
router.post("/info", projectController.info.post);
router.post("/create", projectController.create.post);
router.post("/update", projectController.update.post);
router.post("/delete", projectController.delete.post);
router.post("/attend", projectController.attend.post);
router.post("/accept", projectController.accept.post);
router.post("/reject", projectController.reject.post);
router.post("/rejectCheck", projectController.rejectCheck.post);
router.post("/cancel", projectController.cancel.post);
router.post("/participant", projectController.participant.post);

module.exports = router;
