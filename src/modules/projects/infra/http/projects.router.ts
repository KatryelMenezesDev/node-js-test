import { Router } from "express";
import { CreateProjectsController, FindAllProjectsController } from "@modules/projects/infra/http/projects.controller";
import { CreateProjectsValidator } from "@modules/projects/infra/http/projects.validator";
import { celebrate } from "celebrate";

export const projectsRouter = Router();

const createProjectsController = new CreateProjectsController();
const findAllProjectsController = new FindAllProjectsController();

projectsRouter.post("/", celebrate(CreateProjectsValidator), createProjectsController.handle);
projectsRouter.get("/", findAllProjectsController.handle);
