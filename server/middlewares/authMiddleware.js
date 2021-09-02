import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    throw new Error(errors.array()[0].msg);
  }
  next();
};

export const protect = asyncHandler(async (req, res, next) => {
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
      console.log(error.message);
      res.status(401);
      throw new Error("Invalid token");
    }
  } else {
    throw new Error("Not Authorized , invalid token");
  }
});

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};
