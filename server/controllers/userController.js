const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const { Utils, Logger, ApiError } = require("../utils");
const { userServices } = require("../services");

/**
 * @description("Get logged in user profile")
 * @access("user")
 */
exports.userProfile = asyncHandler(async (req, res) => {
  const user = await userServices.getUserById(req.user._id);
  if (user) {
    return res.json(Utils.returnUserWithoutToken(user));
  }
  throw new ApiError(404, "User not found");
});

/**
 * @description("Update and return logged in user profile")
 * @access("user")
 */
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const userId = req.user._id;
  const data = await userServices.updateLoggedInUserProfile(
    userId,
    name,
    password
  );
  return res.json(data);
});

/**
 * @description("Get user's list")
 * @access("admin")
 */
exports.getUsersList = asyncHandler(async (req, res) => {
  const users = await User.find({}).exec();
  res.json(users);
});

/**
 * @description("Get user by Id")
 * @access("admin")
 */
exports.getUserDetailsById = asyncHandler(async (req, res) => {
  const user = await userServices.getUserById(req.params.id);
  if (user) {
    res.json(Utils.returnUserWithoutToken(user));
  } else {
    throw new ApiError(404, "User not found");
  }
});

/**
 * @description("Update user by Id")
 * @access("admin")
 */
exports.updateUser = asyncHandler(async (req, res) => {
  const { name, status, isAdmin } = req.body;
  const userId = req.params.id;
  const data = await userServices.updateUserInfo(userId, name, status, isAdmin);
  res.json(data);
});
