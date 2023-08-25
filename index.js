const express = require("express");
const routes = require("./todo/todo.routes");
const routesUser = require("./user/user.routes");
require("dotenv").config();

require("./config/db").connection();

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const router = app.use("/todo", routes);
const routerUser = app.use("/user", routesUser);

app.listen(process.env.PORT_SERVER, (err) => {
  console.log("Listening...");
});
