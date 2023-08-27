const dao = require("./todo.dao");
const common = require("../common/common");

//Receives the array of todoids and returns the fullfledged details of todo
const getAll = async (req, res) => {
  const details = await dao.getAllTodo(req.body);
  if (details) {
    common.successRes(res, details);
  } else {
    common.failure_func(res);
  }
};

//Adding new todo
const post = async (req, res) => {
  const todo = await dao.postTodo(req.body);
  if (todo) common.successRes(res, todo);
  else common.failure_func(res);
};

//Deleteing todo
const remove = async (req, res) => {
  const result = await dao.removeTodo(req.body);
  if (result) common.successRes(res, "Successfully deleted");
  else common.failure_func(res);
};

//Updating todo from not completed -> completed
const update = async (req, res) => {
  const isUpdated = await dao.updateTodo(req.body);
  if (isUpdated) common.successRes(res, "Successfully updated");
  else common.failure_func(res);
};

module.exports = {
  getAll,
  post,
  remove,
  update,
};
