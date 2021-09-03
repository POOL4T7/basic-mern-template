import mongoose from "mongoose";
import Logger from "../utils/Logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    Logger.dbConn(conn.connection.host, null);
  } catch (error) {
    Logger.dbConn(null, error.message);
    process.exit();
  }
};

export default connectDB;
