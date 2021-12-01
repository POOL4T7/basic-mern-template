const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const { Utils, Logger, ApiError } = require("../utils");
const { userServices } = require("../services");

/**
 * @description("Get logged in user profile")
 * @access("user")
 */
exports.userProfile = asyncHandler(async (req, res) => {
  try {
    const user = await userServices.getUserById(req.user._id);
    if (user) {
      return res.json(Utils.returnUserWithoutToken(user));
    }
    throw new ApiError(404, "User not found");
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

/**
 * @description("Update and return logged in user profile")
 * @access("user")
 */
exports.updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { name, password } = req.body;
    const userId = req.user._id;
    const data = await userServices.updateLoggedInUserProfile(
      userId,
      name,
      password
    );
    return res.json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

/**
 * @description("Get user's list")
 * @access("admin")
 */
exports.getUsersList = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

/**
 * @description("Get user by Id")
 * @access("admin")
 */
exports.getUserDetailsById = asyncHandler(async (req, res) => {
  try {
    const user = await userServices.getUserById(req.params.id);
    if (user) {
      res.json(Utils.returnUserWithoutToken(user));
    } else {
      throw new ApiError(404, "User not found");
    }
  } catch (error) {
    return res.status(500).json(e.message);
  }
});

/**
 * @description("Update user by Id")
 * @access("admin")
 */
exports.updateUser = asyncHandler(async (req, res) => {
  try {
    const { name, status, isAdmin } = req.body;
    const userId = req.params.id;
    const data = await userServices.updateUserInfo(
      userId,
      name,
      status,
      isAdmin
    );
    return res.json(data);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});
