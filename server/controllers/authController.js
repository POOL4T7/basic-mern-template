const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const { authServices } = require("../services/");
const { Utils, ApiError } = require("../utils");

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
  const { email_verified, name, email } = await authServices.verifyGoogleIdToken(
    idToken
  );
  if (email_verified) {
    const user = await User.findOne({ email }).exec();
    if (user) {
      if (user.status === "active") {
        return res.json(returnUserWithToken(user));
      } else {
        throw new ApiError(401, `Your account is ${user.status}`);
      }
    } else {
      let password = email + process.env.JWT_SECRET;
      const user = await authServices.createUser(name, email, password);
      return res.json(Utils.returnUserWithToken(user));
    }
  }
});
