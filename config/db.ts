import mongoose from "mongoose";

require("dotenv").config({ path: "./config.env" });

const MONGO_URI = process.env.MONGO_URI?.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD!
);

mongoose.set("strictQuery", true);

const connectDb = async () => {
  const con = await mongoose.connect(MONGO_URI!, {
    //@ts-ignore
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  });

  //@ts-ignore
  console.log(`MongoDB Connected: ${con.connection.host}`);
};

export default connectDb;
