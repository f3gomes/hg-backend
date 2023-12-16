require("dotenv").config();
import mongoose from "mongoose";

export const main = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(process.env.DB_URL!);

    console.log("Database connected");
  } catch (error) {
    console.log(`Connect Error: ${error}`);
  }
};
