const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const bcryptCompare = async (password, actualPassword) => {
  return await bcrypt.compare(password, actualPassword);
};

const bcryptHash = async (password) => {
  return await bcrypt.hash(password, 5);
};

const jwtSign = (data) => {
  return jwt.sign(data, process.env.SECRET_KEY);
};

const jwtVerify = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

const failure_func = (res) => {
  res.status(500).send("Something went wrong");
};

const successRes = (res, data) => {
  res.json({ msg: data });
};

module.exports = {
  bcryptCompare,
  bcryptHash,
  jwtSign,
  jwtVerify,
  failure_func,
  successRes,
};
