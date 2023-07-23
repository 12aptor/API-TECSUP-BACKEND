import { Router } from "express";
import * as controller from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/auth/signup", controller.signupUser);
authRouter.post("/auth/signin", controller.signinUser);
