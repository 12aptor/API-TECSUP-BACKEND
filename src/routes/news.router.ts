import { Router } from "express";
import * as controller from "../controllers/news.controller";

export const newsRouter = Router();

newsRouter.post("/news/create", controller.createNew);
newsRouter.get("/news", controller.getNews);
newsRouter.get("/news/:id", controller.getNew);
newsRouter.put("/news/:id", controller.updateNew);
newsRouter.delete("/news/:id", controller.deleteNew);
