const express = require("express");
const controller = require("./todo.controller");
const router = express.Router();
const middleware = require("../middleware/token_verifier");

router.get("/", middleware, controller.getAll);
router.post("/add", middleware, controller.post);
router.delete("/remove", middleware, controller.remove);
router.put("/update", middleware, controller.update);

module.exports = router;
