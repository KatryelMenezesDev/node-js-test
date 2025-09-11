import "reflect-metadata";
import "express-async-errors";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";

import "@shared/container";
import { appConfig } from "@config/app";
import swaggerDocs from "@utils/Swagger";
import { SequelizeClient } from "@shared/infra/sequelize/sequelizeClient";

import { handleErrors } from "./middlewares/handleErrors";
import { router } from "./routes";

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
if (appConfig.env === "local") {
  app.use(morgan("dev"));
}

app.use(
  cors({
    origin: "*",
  }),
);
app.use(router);
app.use(handleErrors);

swaggerDocs(app);
async function startServer() {
  try {
    await SequelizeClient.authenticate();

    httpServer.listen(appConfig.port, () => {
      console.log(`🚀 Server is running on port http://localhost:${appConfig.port}/api-docs`);
    });
  } catch (error) {
    console.error("❌ Falha ao inicializar o servidor:", error);
    process.exit(1);
  }
}

startServer();

export default app;
