const model = require("./todo.model");

//Called when user deletes their account
//And it is called to delete corresponding todo records
const deleteTodos = async (array) => {
  for (let i = 0; i < array.length; i++) {
    await model.findOneAndDelete({ _id: array[i] });
  }
};

module.exports = {
  deleteTodos,
};
