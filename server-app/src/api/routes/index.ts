import { Router } from "express";
import usersRouter from "./users-routes";
import pinsRouter from "./pins-routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/pins", pinsRouter);
export default router;
