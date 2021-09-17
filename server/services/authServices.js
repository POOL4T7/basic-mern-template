const User = require("../models/userModel.js");
const ApiError = require("../utils/ApiError.js");
const { returnUserWithToken } = require("../utils/Utils.js");
const { OAuth2Client } = require("google-auth-library");
const userServices = require("./userServices");
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_KEY);

/**
 * @description("create new user")
 * @returns {Promise<User>}
 */
exports.createUser = async (name, email, password) => {
  if (await User.isEmailTaken(email)) {
    throw new ApiError("400", "user already exists");
  }
  const newUser = await User.create({ name, email, password });
  return returnUserWithToken(newUser);
};

/**
 * @description("Login with email and password")
 * @returns {Promise<User>}
 */
exports.loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userServices.getUserByEmail(email);
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Incorrect email or password");
  }
  if (user.status === "active") {
    return returnUserWithToken(user);
  }
  throw new ApiError(400, `Your account is ${user.status}`);
};

/**
 * @description("Login with email")
 * @returns {Promise<User>}
 */
exports.loginUserWithEmail = async (email) => {
  const user = await userServices.getUserByEmail(email);
  if (user.status === "active") {
    return returnUserWithToken(user);
  }
  throw new ApiError(400, `Your account is ${user.status}`);
};

/**
 * @description("verify idToken")
 * @returns { email_verified, name, email,picture }
 */
exports.verifyGoogleIdToken = async (idToken) => {
  const { payload } = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_LOGIN_CLIENT_KEY,
  });
  return payload;
};
