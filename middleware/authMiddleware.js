// middleware function is just a function that has access to req/res objects
// then uses next to move on to the next middlware function

const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../constants");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
