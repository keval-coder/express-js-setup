import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersModel } from "../database/models/users.model.js";
import { ApiError } from "../utils/error-handler/api-error.js";
import httpStatus from "http-status";

export const passportStrategy = (passport) => {
  const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(options, async (jwt_payload, done) => {
      UsersModel.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false, { message: "You are Unauthorized" });
        })
        .catch((err) => done(err, false));
    })
  );
};
