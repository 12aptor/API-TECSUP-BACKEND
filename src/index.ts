import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import { authRouter } from "./routes/auth.router";
import { bootcampRouter } from "./routes/bootcamp.router";
import { userRouter } from "./routes/user.router";
import { newsRouter } from "./routes/news.router";
import { recommendationRouter } from "./routes/recommendation.router";
import { redirect } from "./utils/redirect";
import { isAuthorized } from "./utils/middleware";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/", redirect);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", authRouter);
app.use("/api", bootcampRouter);
app.use("/api", isAuthorized, newsRouter);
app.use("/api", isAuthorized, recommendationRouter);
app.use("/api", isAuthorized, userRouter);
app.use("/files", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`Running:  http://localhost:${port}`);
});
