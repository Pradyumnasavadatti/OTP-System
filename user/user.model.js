const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
});

module.exports = new mongoose.model("User", userSchema);
