const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyUser = require("../middlewares/verifyUser");

router.route("/register").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/updateUser").put(verifyUser, userController.updateUserProfile);

module.exports = router;
