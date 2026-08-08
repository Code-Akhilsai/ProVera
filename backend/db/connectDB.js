import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "ProVeraDB",
    });

    console.log(`Database connected successfully`);
  } catch (error) {
    console.error(`Database failed to connect:${error}`);
  }
};

export default connectDB;
