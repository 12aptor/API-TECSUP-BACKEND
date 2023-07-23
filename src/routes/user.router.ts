import { Router } from "express";
import * as controller from "../controllers/user.controller";

export const userRouter = Router();

userRouter.post("/user/create", controller.createUser);
userRouter.get("/user", controller.getUsers);
userRouter.get("/user/:id", controller.getUser);
userRouter.put("/user/:id", controller.updateUser);
userRouter.delete("/user/:id", controller.deleteUser);
