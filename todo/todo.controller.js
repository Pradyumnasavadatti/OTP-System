const { ObjectId } = require("mongoose");
const model = require("./todo.model");
const { addIntoUser } = require("../user/user.controller");
const jwt = require("jsonwebtoken");

const getAll = async (req, res) => {
  try {
    const todos = await model.find();
    res.send(todos);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const post = async (req, res) => {
  try {
    debugger;
    let userId;
    const { token, ...userData } = req.body;
    console.log(token, userData);
    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json({ token: null });
      } else {
        userId = data._id;
        console.log("Username", userId);
      }
    });

    let todo = new model(userData);
    let isUpdated = await addIntoUser(userData.userId, todo._id);
    if (isUpdated) {
      await todo.save();
      res.send(todo);
    } else {
      res.status(500).send("Something went wrong");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const remove = async (req, res) => {
  try {
    let todo = await model.findOneAndDelete({ _id: req.body._id });
    console.log(todo);
    res.send("Successfully removed");
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const update = async (req, res) => {
  try {
    let todo = await model.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body }
    );
    res.send("Successfully updated");
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};

module.exports = {
  getAll,
  post,
  remove,
  update,
};
