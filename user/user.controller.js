const dao = require("./user.dao");
const common = require("../util/common");
//Sign In
const getIsCorrect = async (req, res) => {
  const token = await dao.getIsCorrect(req.body.username, req.body.password);
  if (token) {
    common.successRes(res, token);
  } else {
    common.failure_func(res);
  }
};

//SignUp
const postUser = async (req, res) => {
  const isCreated_Token = await dao.postUser(req.body);
  if (isCreated_Token) common.successRes(res, isCreated_Token);
  else common.failure_func(res);
};

//To check wheather username entered is already present ? return true : return false
//To maintain unique uernames
const isPresent = async (req, res) => {
  const isExist = await dao.isPresent(req.body.username);
  common.successRes(res, isExist);
};

//To get datails of user
const getUser = async (req, res) => {
  const user = await dao.getUser(req.body.userId);
  if (user) common.successRes(res, user);
  else common.failure_func(res);
};

const remove = async (req, res) => {
  const result = await dao.deleteUser(req.body.userId);
  if (result) common.successRes(res, "Successfully deleted");
  else common.failure_func(res);
};

const emailVerify = async (req, res) => {
  const isSent = await dao.emailVerify(req.body.username);
  if (isSent) common.successRes(res, "Verification code sent!");
  else common.failure_func(res);
};

const otpVerify = async (req, res) => {
  if (await dao.otpVerify(req.body.otp, req.body.username))
    common.successRes(res, "OTP verification completed!");
  else common.failure_func(res);
};

module.exports = {
  getIsCorrect,
  postUser,
  isPresent,
  getUser,
  remove,
  emailVerify,
  otpVerify,
};
