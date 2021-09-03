import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import morgan from "morgan";
import Logger from "./utils/Logger.js";
//import routes
import authRoute from "./routes/userRoute.js";

//import middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
dotenv.config();
const app = express();
mongoDB();
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//routes middleware
app.use("/api/users", authRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  Logger.appStarted(5000, "127.0.0.1");
});
