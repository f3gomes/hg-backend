import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const main = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.DB_URL!);

    console.log("Database connected");
  } catch (error) {
    console.log(`Connect Error: ${error}`);
  }
};
