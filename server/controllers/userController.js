import User from "../models/userModel.js";
import { generateToken, verify_google_reCaptcha } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";

// @desc  POST register new user
// @router POST /api/users
// @access public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, google_recaptcha_token } = req.body;
  // await verify_google_reCaptcha(google_recaptcha_token, res);
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc  POST auth user and get token
// @router POST /api/users/login
// @access public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password, google_recaptcha_token } = req.body;
  // await verify_google_reCaptcha(google_recaptcha_token, res);
  const user = await User.findOne({ email }).exec();
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
  res.status(404);
  throw new Error("Invalid email or password");
});

// @desc    user profile
// @router GET /api/users/profile
// @access private
export const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id }).exec();
  if (user) {
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
  res.status(404);
  throw new Error("User not found");
});

// @desc    update user profile
// @router  POST /api/users/:id
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id }).exec();
  if (user) {
    user.name = req.body.name || user.name;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    return res.json({
      _id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  }
  res.status(404);
  throw new Error("User not found");
});