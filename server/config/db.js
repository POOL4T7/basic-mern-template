import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("mongoDB connected: ", conn.connection.host);
  } catch (error) {
    console.log("mongoDB error: ", error.message);
    process.exit();
  }
};

export default connectDB;
