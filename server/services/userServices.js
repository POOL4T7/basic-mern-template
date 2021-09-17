const User = require("../models/userModel.js");
const { ApiError, Utils } = require("../utils");
const { returnUserWithoutToken } = require("../utils/Utils.js");

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return await User.findById(id).exec();
};

/**
 * Get user by email
 * @param {String} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return await User.findOne({ email }).exec();
};

/**
 * @description("user logged in user profile")
 * @returns {Promise<updatedUser>}
 */
const updateLoggedInUserProfile = async (userId, name, password) => {
  const user = await getUserById(userId);
  if (user) {
    user.name = name || user.name;
    if (password) {
      user.password = password;
    }
    const updateUser = await user.save();
    return Utils.returnUserWithToken(updateUser);
  }
  throw new ApiError(404, "Something went wrong, please try again..");
};

const updateUserInfo = async (userId, name, status, isAdmin) => {
  const user = await getUserById(userId);
  if (user) {
    user.name = name || user.name;
    user.isAdmin = isAdmin ? true : false;
    user.status = status;
    const updateUser = await user.save();
    return returnUserWithoutToken(updateUser);
  }
  throw new ApiError(404, "User not found");
};

module.exports = {
  getUserById,
  getUserByEmail,
  updateLoggedInUserProfile,
  updateUserInfo,
};
