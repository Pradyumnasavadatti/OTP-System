const { jwtVerify, failure_func } = require("../util/common");

module.exports = (req, res, next) => {
  try {
    const { token } = req.body;
    const data = jwtVerify(token);
    req.body.userId = data.id;
    next();
  } catch (err) {
    failure_func(res);
  }
};
