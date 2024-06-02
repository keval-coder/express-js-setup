import httpStatus from "http-status";
import { RolesModel } from "../database/models/roles.model.js";
import { ApiError } from "../utils/error-handler/api-error.js";

export const createRoleService = async (body) => {
  try {
    const { name } = body;

    const role = await RolesModel.findOneAndUpdate(
      {
        name,
      },
      body,
      {
        upsert: true,
        new: true,
      }
    );

    return role;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

export const findAllRoleService = async (search) => {
  try {
    const roles = await RolesModel.find({
      ...(search
        ? {
            name: {
              $regex: new RegExp(search, "i"),
            },
          }
        : {}),
    });

    return roles;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};

export const findOneRoleService = async (roleId) => {
  try {
    const role = await RolesModel.findById(roleId);

    return role;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
};
