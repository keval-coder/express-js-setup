import httpStatus from "http-status";
import { ApiError } from "../utils/error-handler/api-error.js";
import { UsersModel } from "../database/models/users.model.js";
import jwt from "jsonwebtoken";

export const loginService = async (body) => {
  try {
    const { email, password } = body;

    const user = await UsersModel.findOne({
      email,
    }).populate("role_id");
    if (!user)
      throw new ApiError(httpStatus.BAD_REQUEST, "Email is not valid.");

    const isMatch = user.comparePassword(password);
    if (!isMatch)
      throw new ApiError(httpStatus.BAD_REQUEST, "Password is not valid.");

    const payload = {
      id: user?._id,
      first_name: user.first_name,
      role: user?.role_id,
    };

    const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 31556926,
    });

    return {
      user,
      access_token,
    };
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};
