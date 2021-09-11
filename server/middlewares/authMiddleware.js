const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const Logger = require("../utils/Logger.js");
const ApiError = require("../utils/ApiError.js");

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(422, errors.array()[0].msg);
  }
  next();
};

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findOne({ _id: decode.id }).select("-password");
      next();
    } catch (error) {
      Logger.error(error.message);
      throw new ApiError(401, "Invalid token");
    }
  } else {
    throw new ApiError(401, "Not Authorized, invalid token");
  }
});

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new ApiError(401, "Not authorized as admin");
  }
};
