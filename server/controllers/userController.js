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
