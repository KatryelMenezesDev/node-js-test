import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { appConfig } from "@config/app";

import { version } from "../../package.json";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API NODE JS TEST",
      version,
      description: "API BackEnd Node JS Test",
      contact: {
        email: "katryelmenezesvieira14@gmail.com",
      },
    },
    externalDocs: {
      description: "swagger.json",
      url: "/swagger.json",
    },
    servers: [
      {
        url: `http://localhost:${String(appConfig.port)}`,
        description: "API LOCAL HTTP",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.swagger.yaml"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
