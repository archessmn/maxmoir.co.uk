import Express, { Router } from "express";
import userRouter from "../routes/api/User";

const router = Router();

router.use("/user", userRouter);

export default router;
