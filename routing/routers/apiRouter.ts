import Express, { Router } from "express";
import userRouter from "../routes/api/User";

const apiRouter = Router();

apiRouter.use("/user", userRouter);

export default apiRouter;
