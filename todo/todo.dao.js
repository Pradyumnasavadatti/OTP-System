const model = require("./todo.model");
const common = require("../common/common");
const userService = require("../user/user.service");

const getAllTodo = async (reqData) => {
  try {
    const { token, ...array } = reqData;
    common.jwtVerify(token);
    const result = [];
    for (let i = 0; i < array.todos.length; i++) {
      const data = await model.findById(array.todos[i]);
      if (data) result.push(data);
    }
    return result;
  } catch (err) {
    return null;
  }
};

const postTodo = async (data) => {
  try {
    const { token, ...userData } = data;
    const tokenData = common.jwtVerify(token);
    let todo = new model(userData);
    let isUpdated = await userService.addIntoUser(tokenData.id, todo._id);
    if (isUpdated) {
      await todo.save();
      return todo;
    }
  } catch (err) {
    return null;
  }
};

const removeTodo = async (reqData) => {
  try {
    const { token, todoId } = reqData;
    const data = common.jwtVerify(token);
    //Request for update in user model
    const isUpdated = await userService.userUpdateTodo(data.id, todoId);
    if (isUpdated) await model.findOneAndDelete({ _id: todoId });
    return isUpdated;
  } catch (err) {
    return false;
  }
};

const updateTodo = async (reqData) => {
  try {
    const { token, ...data } = reqData;
    common.jwtVerify(token);
    // const todo = await model.findById(data._id);
    await model.findOneAndUpdate(
      { _id: data._id },
      { $set: { completed: true } }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getAllTodo,
  postTodo,
  removeTodo,
  updateTodo,
};
