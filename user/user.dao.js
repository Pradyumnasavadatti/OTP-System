const model = require("./user.model");
const common = require("../common/common");
const todoService = require("../todo/todo.service");
const getIsCorrect = async (username, password) => {
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

const getUser = async (token) => {
  try {
    const dataFromToken = common.jwtVerify(token);
    const user = await model.findById(dataFromToken.id);
    if (user) return user;
    else return null;
  } catch (err) {
    return null;
  }
};

const deleteUser = async (token) => {
  try {
    const data = common.jwtVerify(token);
    const user = await model.findById(data.id);
    await todoService.deleteTodos(user.todos);
    await model.findOneAndDelete({ _id: user._id });
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  getIsCorrect,
  postUser,
  isPresent,
  getUser,
  deleteUser,
};
