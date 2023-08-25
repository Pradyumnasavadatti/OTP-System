const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  username: mongoose.Schema.Types.ObjectId,
});

const todoModel = new mongoose.model("Todo", todoSchema);

module.exports = todoModel;
