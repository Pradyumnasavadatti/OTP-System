require("dotenv").config();

const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pradyumnasavadatti7:Pps72000@ps-cluster.dzonnbv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  connection,
};
