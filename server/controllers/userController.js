import User from "../models/userModel.js";
import { returnUser } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";

/**
 * @description("Get logged in user profile")
 * @access("user")
 */
export const userProfile = asyncHandler(async (req, res) => {
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
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
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
