import httpStatus from "http-status";
import {
  createRoleService,
  findAllRoleService,
  findOneRoleService,
} from "../services/roles.service.js";
import { ApiError } from "../utils/error-handler/api-error.js";
import { catchAsync } from "../middlewares/catch-async.js";

export const createRole = catchAsync(async (req, res) => {
  try {
    const role = await createRoleService(req.body);

    res.status(httpStatus.CREATED).send({
      msg: "Role created successfully.",
      data: role,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});

export const findAllRoles = catchAsync(async (req, res) => {
  try {
    const { search } = req.query;

    const roles = await findAllRoleService(search);

    res.status(httpStatus.OK).send({
      msg: "Roles fetched successfully.",
      data: roles,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});

export const findOneRole = catchAsync(async (req, res) => {
  try {
    const { roleId } = req.params;

    const role = await findOneRoleService(roleId);

    res.status(httpStatus.OK).send({
      msg: "Role fetched successfully.",
      data: role,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});
