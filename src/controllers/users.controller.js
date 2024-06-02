import httpStatus from "http-status";
import { createUserService } from "../services/users.service.js";
import { ApiError } from "../utils/error-handler/api-error.js";
import { catchAsync } from "../middlewares/catch-async.js";

export const createUser = catchAsync(async (req, res) => {
  try {
    const user = await createUserService(req?.body);

    res.status(httpStatus.CREATED).send({
      msg: "User created successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error, "Controller Error");
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});
