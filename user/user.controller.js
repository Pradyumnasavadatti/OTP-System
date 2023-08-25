const mongoose = require("mongoose");
const model = require("./user.model");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const failure_func = (res) => {
  res.status(500).send("Something went wrong");
};

const getIsCorrect = async (req, res) => {
  try {
    let user = await model.find({
      username: req.body.username,
    });
    if (user.length != 0) {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          failure_func(res);
          return;
        }
        if (result) {
          console.log(user[0]._id);
          const token = jwt.sign({ id: user[0]._id }, process.env.SECRET_KEY);
          res.json({ token: token });
        } else {
          res.json({ token: null });
        }
      });
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
    failure_func(res);
  }
};

const postUser = async (req, res) => {
  try {
    const userInstance = req.body;
    userInstance.password = await bcrypt.hash(userInstance.password, 5);

    const user = new model(userInstance);
    await user.save();
    res.send("Successfully signed up");
  } catch (err) {
    console.log(err);
    failure_func(res);
  }
};

const isPresent = async (req, res) => {
  try {
    const user = await model.findById({
      username: { $regex: String(req.body.username) },
    });
    if (user.length != 0) {
      res.json({ flag: true });
    } else {
      res.json({ flag: false });
    }
  } catch (err) {
    console.log(err);
    failure_func(res);
  }
};

const getUser = async (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.SECRET_KEY, async (err, data) => {
      if (err) {
        res.status(500).json({ data: null });
        return;
      }
      console.log(data);
      const user = await model.findById({ _id: data.id });
      if (user) res.json({ data: user });
      else res.json({ data: null });
    });
  } catch (err) {
    failure_func(res);
  }
};

const addIntoUser = async (userId, todoId) => {
  try {
    let user = await model.findById({ _id: userId });
    const newTodos = user.todos || [];
    newTodos.push(todoId);
    // console.log(user);

    let temp = await model.findOneAndUpdate(
      { _id: user._id },
      { $set: { todos: newTodos } }
    );
    // console.log(temp);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  getIsCorrect,
  postUser,
  isPresent,
  addIntoUser,
  getUser,
};
