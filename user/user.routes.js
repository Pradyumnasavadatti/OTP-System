const express = require("express");
const controller = require("./user.controller");
const router = express.Router();
const middlewareToken = require("../middleware/token_verifier");
const middlewareEmail = require("../middleware/email_verifier");
router.get("/", middlewareEmail, controller.getIsCorrect);
router.post("/newUser", middlewareEmail, controller.postUser);
router.get("/checkUsername", middlewareEmail, controller.isPresent);
router.get("/getUser", middlewareToken, controller.getUser);
router.delete("/deleteUser", middlewareToken, controller.remove);
router.get("/emailVerify", middlewareEmail, controller.emailVerify);
router.get("/otpVerify", middlewareEmail, controller.otpVerify);

module.exports = router;
