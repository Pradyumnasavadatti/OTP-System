const express = require("express");
const controller = require("./todo.controller");
const router = express.Router();

router.get("/", controller.getAll);
router.post("/add", controller.post);
router.delete("/remove", controller.remove);
router.put("/update", controller.update);

module.exports = router;
