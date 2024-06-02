import { ApiError } from "../utils/error-handler/api-error.js";
import httpStatus from "http-status";

export const requestValidator = (schema) => {
  return (req, res, next) => {
    const property = {
      ...req?.body,
      ...req?.params,
      ...req?.query,
    };

    const { error } = schema.validate(property);

    if (!error) {
      next();
    } else {
      const { details } = error;

      const message = details.map((i) => i.message).join(",");

      throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, message);
    }
  };
};
