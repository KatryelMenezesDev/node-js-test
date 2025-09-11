import { Router } from "express";
import {
  CreateProjectsController,
  FindAllProjectsController,
  FindProjectByIdController,
  UpdateProjectController,
  DeleteProjectController,
} from "@modules/projects/infra/http/projects.controller";
import {
  CreateProjectsValidator,
  UpdateProjectValidator,
  FindProjectByIdValidator,
  DeleteProjectValidator,
} from "@modules/projects/infra/http/projects.validator";
import { CreateTaskController } from "@modules/tasks/infra/http/tasks.controller";
import { CreateTaskValidator } from "@modules/tasks/infra/http/tasks.validator";
import { celebrate } from "celebrate";

export const projectsRouter = Router();

const createProjectsController = new CreateProjectsController();
const findAllProjectsController = new FindAllProjectsController();
const findProjectByIdController = new FindProjectByIdController();
const updateProjectController = new UpdateProjectController();
const deleteProjectController = new DeleteProjectController();
const createTaskController = new CreateTaskController();

projectsRouter.post("/", celebrate(CreateProjectsValidator), createProjectsController.handle);
projectsRouter.get("/", findAllProjectsController.handle);
projectsRouter.get("/:id", celebrate(FindProjectByIdValidator), findProjectByIdController.handle);
projectsRouter.put("/:id", celebrate(UpdateProjectValidator), updateProjectController.handle);
projectsRouter.delete("/:id", celebrate(DeleteProjectValidator), deleteProjectController.handle);

// POST /projects/:projectId/tasks → Cria tarefa vinculada a um projeto
projectsRouter.post("/:projectId/tasks", celebrate(CreateTaskValidator), createTaskController.handle);
