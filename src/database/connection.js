import mongoose from "mongoose";
import { ApiError } from "../utils/error-handler/api-error.js";
import httpStatus from "http-status";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected successfully.");
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};
