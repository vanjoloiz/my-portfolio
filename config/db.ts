import mongoose from "mongoose";

require("dotenv").config({ path: "./config.env" });

const MONGO_URI = process.env.MONGO_URI?.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD!
);

mongoose.set("strictQuery", true);

const connectDb = async () => {
  try {
    const con: any = await mongoose.connect(MONGO_URI!, {
      //@ts-ignore
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      serverSelectionTimeoutMS: 60000,
      family: 4,
    });

    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    // process.exit(1);
  }
};

export default connectDb;
