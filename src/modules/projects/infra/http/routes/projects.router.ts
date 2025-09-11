import { Router } from "express";
export const projectsRouter = Router();
projectsRouter.get("/", (req, res) => {
  res.send({
    message: "Projects",
  });
});
