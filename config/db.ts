import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const MONGO_URI = process.env.MONGO_URI?.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD!
);

mongoose.set("strictQuery", true);

const connectDb = async () => {
  try {
    const con = await mongoose.connect(MONGO_URI!, {
      serverSelectionTimeoutMS: 60000,
      family: 4,
    });

    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
