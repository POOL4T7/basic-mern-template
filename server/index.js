const express = require("express");
const dotenv = require("dotenv");
const mongoDB = require("./config/db");
const morgan = require("morgan");
const Logger = require("./utils/Logger.js");
const helmet = require("helmet");
//const routes
const authRoute = require("./routes/authRoutes.js");
const userRoute = require("./routes/userRoutes.js");

//const middlewares
const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
dotenv.config();
const app = express();
mongoDB();

// set security HTTP headers
app.use(helmet());

app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//routes middleware
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  Logger.appStarted(5000, "127.0.0.1");
});
