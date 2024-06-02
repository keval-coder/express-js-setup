import httpStatus from "http-status";
import { RolesModel } from "../database/models/roles.model.js";
import { ApiError } from "../utils/error-handler/api-error.js";
import { UsersModel } from "../database/models/users.model.js";

export const createUserService = async (body) => {
  try {
    const { role_id, email } = body;

    /**
     * Validate role
     */
    const role = await RolesModel.findById(role_id);
    if (!role) throw new ApiError(httpStatus.BAD_REQUEST, "Role is not valid.");

    /**
     * Check if user exist
     */
    const userExist = await UsersModel.findOne({
      email,
    });
    if (userExist)
      throw new ApiError(httpStatus.BAD_REQUEST, "User is already exist.");

    const user = await UsersModel.create({ ...body, role_id: role?._id });

    return user;
  } catch (error) {
    console.log(error, "Service Error");
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};
