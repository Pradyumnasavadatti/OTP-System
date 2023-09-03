const model = require("./todo.model");
const userService = require("../user/user.service");
const redis = require("../config/redis.config");

const getAllTodo = async (array) => {
  try {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      const data = await model.findById(array[i]);
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
    let todo = new model(userData);
    let isUpdated = await userService.addIntoUser(data.userId, todo._id);
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
    //Request for update in user model
    const isUpdated = await userService.userUpdateTodo(
      reqData.userId,
      reqData.todoId
    );
    if (isUpdated) await model.findOneAndDelete({ _id: reqData.todoId });
    return isUpdated;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateTodo = async (todoId) => {
  try {
    // const todo = await model.findById(data._id);
    await model.findOneAndUpdate(
      { _id: todoId },
      { $set: { completed: true } }
    );
    return true;
  } catch (err) {
    return false;
  }
};



module.exports = {
  getAllTodo,
  postTodo,
  removeTodo,
  updateTodo,
};
