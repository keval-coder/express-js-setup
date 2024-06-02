import httpStatus from "http-status";
import { ApiError } from "../utils/error-handler/api-error.js";
import { loginService } from "../services/auth.service.js";
import { catchAsync } from "../middlewares/catch-async.js";

export const login = catchAsync(async (req, res) => {
  try {
    const data = await loginService(req.body);

    res.status(httpStatus.OK).send({
      msg: "Login successfully.",
      data: data,
    });
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error);
  }
});
