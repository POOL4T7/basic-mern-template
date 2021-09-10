const User = require("../models/userModel.js");
const { returnUser } = require("../utils/Utils.js");
const asyncHandler = require("express-async-handler");

/**
 * @description("Get logged in user profile")
 * @access("user")
 * @method("GET")
 */
exports.userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id }).exec();
  if (user) {
    return res.json(returnUser(user));
  }
  res.status(404);
  throw new Error("User not found");
});

/**
 * @description("Update and return logged in user profile")
 * @access("user")
 * @method("POST")
 */
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id }).exec();
  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    return res.json(returnUser(updateUser));
  }
  res.status(404);
  throw new Error("User not found");
});

/**
 * @description("Get user's list")
 * @access("admin")
 * @method("GET")
 */
exports.getUsersList = asyncHandler(async (req, res) => {
  const users = await User.find({}).exec();
  res.json(users);
});

/**
 * @description("Get user by Id")
 * @access("admin")
 * @method("GET")
 */
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

/**
 * @description("Update user by Id")
 * @access("admin")
 * @method("POST")
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ? true : false;
    user.status = req.body.status;
    const updateUser = await user.save();

    return res.json({
      _id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  }
  res.status(404);
  throw new Error("User not found");
});
