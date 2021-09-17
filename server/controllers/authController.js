const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const { authServices } = require("../services/");
const { Utils } = require("../utils");

/**
 * @description("register new  and return the user")
 * @access("guest")
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, google_recaptcha_token } = req.body;
  await Utils.verify_google_reCaptcha(google_recaptcha_token);
  const user = await authServices.createUser(name, email, password);
  return res.json(user);
});

/**
 * @description("authenticate user and return user & token")
 * @access("guest")
 */
const authUser = asyncHandler(async (req, res) => {
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
const GoogleLogin = asyncHandler(async (req, res) => {
  const idToken = req.body.idToken;
  const { email_verified, name, email } =
    await authServices.verifyGoogleIdToken(idToken);
  if (email_verified) {
    const user = await User.findOne({ email }).exec();
    if (user) {
      const data = await authServices.loginUserWithEmail(email);
      return res.json(data);
    } else {
      let password = email + process.env.JWT_SECRET;
      const user = await authServices.createUser(name, email, password);
      return res.json(user);
    }
  }
});

module.exports = { registerUser, authUser, GoogleLogin };
