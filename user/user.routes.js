const express = require("express");
const controller = require("./user.controller");
const router = express.Router();

router.get("/", controller.getIsCorrect);
router.post("/newUser", controller.postUser);
router.get("/checkUsername", controller.isPresent);
router.get("/getUser", controller.getUser);
router.delete("/deleteUser", controller.remove);

module.exports = router;
