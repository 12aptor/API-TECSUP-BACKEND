import { Router } from "express";
import * as recommendationController from "../controllers/recommendation.controller";


export const recommendationRouter = Router();

recommendationRouter.post("/recommendation/create", recommendationController.createRecommendation);
recommendationRouter.get("/recommendation", recommendationController.getRecommendations);
recommendationRouter.get("/recommendation/:id", recommendationController.getRecommendation);
recommendationRouter.put("/recommendation/:id", recommendationController.updateRecommendation);
recommendationRouter.delete("/recommendation/:id", recommendationController.deleteRecommendation);