import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import morgan from "morgan";
import Logger from "./utils/Logger.js";
import helmet from "helmet";
//import routes
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";

//import middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
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
