import express from "express";
import dotenv from "dotenv";
import mongoDB from "./config/db.js";
import morgan from "morgan";
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
  console.log(`server is running in ${process.env.NODE_ENV} on ${port}`);
});
