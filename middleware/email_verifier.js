const { isValidEmail, failure_func } = require("../util/common");

module.exports = (req, res, next) => {
  if (isValidEmail(req.body.username)) {
    next();
  } else {
    failure_func(res);
  }
};
