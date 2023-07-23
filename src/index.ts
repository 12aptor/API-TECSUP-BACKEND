import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { authRouter } from "./routes/auth.router";
import { bootcampRouter } from "./routes/bootcamp.router";
import { userRouter } from "./routes/user.router";
import { newsRouter } from "./routes/news.router";
import { recommendationRouter } from "./routes/recommendation.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { redirect } from "./utils/redirect";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
// Redirect "/" to swagger docs
app.get("/", redirect);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", authRouter);
app.use("/api", bootcampRouter);
app.use("/api", newsRouter);
app.use("/api", recommendationRouter);
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Running:  http://localhost:${port}`);
});
