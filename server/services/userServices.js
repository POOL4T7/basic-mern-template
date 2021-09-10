import User from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";

export const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
