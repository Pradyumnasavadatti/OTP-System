const model = require("./user.model");
const common = require("../util/common");
const todoService = require("../todo/todo.service");
const { send_email, getOTPFromRedis } = require("../util/email");

const getIsCorrect = async (username, password) => {
  try {
    let user = await model.find({
      username: username,
    });
    if (user.length != 0) {
      const result = await common.bcryptCompare(password, user[0].password);
      if (result) {
        const token = common.jwtSign({ id: user[0]._id });
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    common.failure_func(res);
  }
};

const postUser = async (data) => {
  try {
    data.password = await common.bcryptHash(data.password);
    const user = new model(data);
    await user.save();
    const token = common.jwtSign({ id: user._id });
    return token;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const isPresent = async (username) => {
  try {
    const user = await model.find({
      username: username,
    });
    if (user.length != 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

const getUser = async (userId) => {
  try {
    const user = await model.findById(userId);
    if (user) return user;
    else return null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await model.findById(userId);
    await todoService.deleteTodos(user.todos);
    await model.findOneAndDelete({ _id: user._id });
    return true;
  } catch (err) {
    return false;
  }
};

const emailVerify = async (username) => {
  try {
    await send_email(username);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const otpVerify = async (entered_otp, username) => {
  try {
    const otp = await getOTPFromRedis(username);
    if (otp && otp == entered_otp) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getIsCorrect,
  postUser,
  isPresent,
  getUser,
  deleteUser,
  emailVerify,
  otpVerify,
};
