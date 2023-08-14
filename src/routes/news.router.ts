import { Router } from "express";
import * as controller from "../controllers/news.controller";
import multer from "multer";
import path from "path";

export const newsRouter = Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

newsRouter.post("/news/create", upload.single("image"), controller.createNew);
newsRouter.get("/news", controller.getNews);
newsRouter.get("/news/:id", controller.getNew);
newsRouter.put("/news/:id", controller.updateNew);
newsRouter.delete("/news/:id", controller.deleteNew);
