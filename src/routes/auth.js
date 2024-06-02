import { Router } from "express";
import { requestValidator } from "../middlewares/request-validator.js";
import { loginRequest } from "../validators/auth.validation.js";
import { login } from "../controllers/auth.controller.js";
const router = Router();

/**
 * Login
 */
router.post("/login", requestValidator(loginRequest), login);

export default router;
