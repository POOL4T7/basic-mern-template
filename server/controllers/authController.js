const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const { authServices } = require("../services/");
const { Utils } = require("../utils");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_KEY);

/**
 * @description("register new  and return the user")
 * @access("guest")
 */
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, google_recaptcha_token } = req.body;
  await Utils.verify_google_reCaptcha(google_recaptcha_token);
  const user = await authServices.createUser(name, email, password);
  return res.json(Utils.returnUserWithToken(user));
});

/**
 * @description("authenticate user and return user & token")
 * @access("guest")
 */
exports.authUser = asyncHandler(async (req, res) => {
  const { email, password, google_recaptcha_token } = req.body;
  await Utils.verify_google_reCaptcha(google_recaptcha_token, res);
  const user = await authServices.loginUserWithEmailAndPassword(
    email,
    password
  );
  return res.json(user);
});

/**
 * @description("register, authenticate and return user & token")
 * @access("guest")
 */
exports.GoogleLogin = asyncHandler(async (req, res) => {
  const idToken = req.body.idToken;
  const { payload } = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_LOGIN_CLIENT_KEY,
  });
  const { email_verified, name, email } = payload;
  if (email_verified) {
    const user = await User.findOne({ email }).exec();
    if (user) {
      if (user.status === "active") {
        return res.json(returnUserWithToken(user));
      } else {
        throw new Error(`Your account is ${user.status}`);
      }
    } else {
      let password = email + process.env.JWT_SECRET;
      const newUser = await User.create({ name, email, password });
      if (newUser) {
        res.status(201).json(returnUserWithToken(newUser));
      } else {
        res.status(400);
        throw new Error("Server Error, Try again after some time..");
      }
    }
  }
});
