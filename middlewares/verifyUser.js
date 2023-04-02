const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = verifyUser = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401);
        throw new Error("Token Not Found, Login again");
      }
      const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decodedInfo.id).select("+password");
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      } else {
        req.user = user;
        next();
      }
    } else {
      res.status(401);
      throw new Error("User not authorized");
    }
  } catch (error) {
    next(error);
  }
};
