const model = require("./user.model");

//To add newly created todo into user todo array
const addIntoUser = async (userId, todoId) => {
  try {
    let user = await model.findById({ _id: userId });
    const newTodos = user.todos || [];
    newTodos.push(todoId);

    let temp = await model.findOneAndUpdate(
      { _id: user._id },
      { $set: { todos: newTodos } }
    );
    return true;
  } catch (err) {
    return false;
  }
};

const userUpdateTodo = async (userId, todoId) => {
  try {
    const user = await model.findById(userId);
    user.todos = user.todos.filter((id) => id != todoId);
    await model.findOneAndUpdate({ _id: userId }, { $set: user });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  addIntoUser,
  userUpdateTodo,
};
