import httpStatus from "http-status";
import { ApiError } from "../utils/error-handler/api-error.js";
import { RolesModel } from "../database/models/roles.model.js";
import passport from "passport";

const verifyCallBack =
  (req, resolve, reject, requiredRights, next) => async (err, user, info) => {
    if (err || info || !user)
      return next(new ApiError(httpStatus.UNAUTHORIZED), "Unauthorized.");

    const role = await RolesModel.findById(user?.role_id);
    if (!role)
      return next(
        new ApiError(httpStatus.UNAUTHORIZED, "Users role is not valid.")
      );

    if (!requiredRights.includes(role.name)) {
      return next(
        new ApiError(httpStatus.UNAUTHORIZED, {
          message: `You are not allowed. Only ${JSON.stringify(
            ...requiredRights
          )} is allowed.`,
        })
      );
    }

    const { password, ...userData } = user;

    req.user = userData;

    resolve();
  };

export const jwtAuth = (requiredRights) => {
  return async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallBack(req, resolve, reject, requiredRights, next)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(new ApiError(httpStatus.UNAUTHORIZED, err)));
  };
};
