const Logger = require("../utils/Logger.js");
const ApiError = require("../utils/ApiError.js");

exports.notFound = (req, res, next) => {
  const error = new ApiError(400, `NOT FOUND ${req.originalUrl}`);
  Logger.error(error);
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (process.env.NODE_ENV === "production" && !err.isOperational) {
    statusCode = 500;
    message = "INTERNAL_SERVER_ERROR";
  }

  const response = {
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === "development") {
    Logger.warn(err);
  }

  res.status(statusCode).send(response);
};
