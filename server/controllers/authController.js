import User from "../models/userModel.js";
import { verify_google_reCaptcha, returnUser } from "../utils/Utils.js";
import asyncHandler from "express-async-handler";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_KEY);

/**
 * @description("register new  and return the user")
 * @access("guest")
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, google_recaptcha_token } = req.body;
  await verify_google_reCaptcha(google_recaptcha_token, res);
  const userExists = await User.findOne({ email }).exec();
  if (userExists) {
    res.status(400);
    throw new Error("user already exists");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json(registerUser(user));
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

/**
 * @description("authenticate user and return user & token")
 * @access("guest")
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password, google_recaptcha_token } = req.body;
  await verify_google_reCaptcha(google_recaptcha_token, res);
  const user = await User.findOne({ email }).exec();
  if (user && (await user.matchPassword(password))) {
    return res.json(returnUser(user));
  }
  res.status(404);
  throw new Error("Invalid email or password");
});

/**
 * @description("register, authenticate and return user & token")
 * @access("guest")
 */
export const GoogleLogin = asyncHandler(async (req, res) => {
  const idToken = req.body.idToken;
  const { payload } = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_LOGIN_CLIENT_KEY,
  });
  const { email_verified, name, email } = payload;
  if (email_verified) {
    const user = await User.findOne({ email }).exec();
    if (user) {
      return res.json(returnUser(user));
    } else {
      let password = email + process.env.JWT_SECRET;
      const newUser = await User.create({ name, email, password });
      if (newUser) {
        res.status(201).json(returnUser(newUser));
      } else {
        res.status(400);
        throw new Error("Server Error, Try again after some time..");
      }
    }
  }
});
