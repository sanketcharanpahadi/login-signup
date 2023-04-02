const User = require("../models/user");
const generateToken = require("../utils/createToken");

module.exports.signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, firstname, lastname, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      firstname,
      email,
      lastname,
      password,
    });

    if (user) {
      res.status(201).json({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("SORRY, something went wrong");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (user && (await user.correctPassword(password))) {
      res.json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        token: generateToken(user._id),
        password: user.password,
      });
    } else {
      res.status(404);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.firstname = req.body.firstname || user.firstname;
      user.email = req.body.email || user.email;
      user.lastname = req.body.lastname || user.lastname;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        email: updatedUser.email,
        password: updatedUser.password,
        id: updatedUser._id,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not Found");
    }
  } catch (error) {
    next(error);
  }
};
