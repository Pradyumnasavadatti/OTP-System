const express = require("express");
const controller = require("./user.controller");
const router = express.Router();

router.get("/", controller.getIsCorrect);
router.post("/newUser", controller.postUser);
router.get("/checkUser", controller.isPresent);
router.get("/getUser", controller.getUser);

module.exports = router;
