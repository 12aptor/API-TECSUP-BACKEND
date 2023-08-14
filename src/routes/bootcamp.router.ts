import { Router } from "express";
import * as controller from "../controllers/bootcamp.controller";
import { isAuthorized } from "../utils/middleware";

export const bootcampRouter = Router();

bootcampRouter.post("/bootcamp/create", controller.createBootcamp);
bootcampRouter.get("/bootcamp", isAuthorized, controller.getBootcamps);
bootcampRouter.get("/bootcamp/:id", controller.getBootcamp);
bootcampRouter.put("/bootcamp/:id", controller.updateBootcamp);
bootcampRouter.delete("/bootcamp/:id", controller.deleteBootcamp);
