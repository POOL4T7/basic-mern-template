import Logger from "../utils/Logger.js";

export const notFound = (req, res, next) => {
  const error = new Error(`NOT FOUND ${req.originalUrl}`);
  res.status(400);
  Logger.error(error);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  Logger.error(err.message);
  Logger.error(process.env.NODE_ENV === "production" ? null : err.stack);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
