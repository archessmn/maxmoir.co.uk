import Express, { Router, Request, Response, NextFunction } from "express";
import controller from "mongo/controllers/User";

const userRouter = Router();

userRouter.post("/create", controller.createUser);
userRouter.get("/get/:userId", controller.readUser);
userRouter.get("/get/", controller.readAll);
userRouter.patch("/update/:userId", controller.updateUser);
userRouter.delete("/delete/:userId", controller.deleteUser);

export default userRouter;
