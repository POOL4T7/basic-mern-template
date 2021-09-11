const User = require("../models/userModel.js");
const ApiError = require("../utils/ApiError.js");
const { returnUser } = require("../utils/Utils.js");

/**
 * @description("create new user")
 * @returns {Promise<User>}
 */
exports.createUser = async (name, email, password) => {
  if (await User.isEmailTaken(email)) {
    throw new ApiError("400", "user already exists");
  }
  return await User.create({ name, email, password });
};

/**
 * @description("Login with username and password")
 * @returns {Promise<User>}
 */
exports.loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email }).exec();
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Incorrect email or password");
  }
  if (user.status === "active") {
    return returnUser(user);
  }
  throw new ApiError(400, `Your account is ${user.status}`);
};
