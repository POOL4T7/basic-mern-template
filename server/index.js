const express = require("express");
const dotenv = require("dotenv");
const mongoDB = require("./config/db");
const morgan = require("morgan");
const { Logger } = require("./utils");

//import routes
const { authRoutes, userRoutes } = require("./routes");

//import middlewares
const { errorMiddleware } = require("./middlewares");
dotenv.config();
const app = express();
mongoDB();

app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  Logger.appStarted(5000, "127.0.0.1");
});
