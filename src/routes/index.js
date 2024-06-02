import { Router } from "express";

import usersRouter from "./users.js";
import rolesRouter from "./roles.js";
import authRouter from "./auth.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/roles", rolesRouter);
router.use("/users", usersRouter);

export default router;
