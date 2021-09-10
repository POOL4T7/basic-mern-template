const User = require("../models/userModel.js");
const ApiError = require("../utils/ApiError.js");
const { returnUser } = require("../utils/Utils.js");

exports.getUserByEmail = async (email) => {
  return User.findOne({ email });
};
