import { Router } from "express";
import { createUser } from "../controllers/users.controller.js";
import { requestValidator } from "../middlewares/request-validator.js";
import { createUserRequest } from "../validators/users.validation.js";
import { jwtAuth } from "../middlewares/jwt-auth.js";
import { ROLES } from "../utils/constants/roles.constant.js";
const router = Router();

/**
 * Create User
 */
router.post(
  "/",
  jwtAuth([ROLES.Admin]),
  requestValidator(createUserRequest),
  createUser
);

export default router;
