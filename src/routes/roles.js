import { Router } from "express";
import {
  createRole,
  findAllRoles,
  findOneRole,
} from "../controllers/roles.controller.js";
import { requestValidator } from "../middlewares/request-validator.js";
import {
  createRoleRequest,
  findAllRolesRequest,
  findOneRoleRequest,
} from "../validators/roles.validation.js";
import { jwtAuth } from "../middlewares/jwt-auth.js";
import { ROLES } from "../utils/constants/roles.constant.js";

const router = Router();

/**
 * Role Create
 */
router.post(
  "/",
  jwtAuth([ROLES.Admin]),
  requestValidator(createRoleRequest),
  createRole
);

/**
 * Role Listing
 */
router.get("/", requestValidator(findAllRolesRequest), findAllRoles);

/**
 * Role find one
 */
router.get("/:roleId", requestValidator(findOneRoleRequest), findOneRole);

export default router;
