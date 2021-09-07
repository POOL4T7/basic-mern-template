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
  const errorObject = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };
  Logger.error(errorObject);
  res.json(errorObject);
};
