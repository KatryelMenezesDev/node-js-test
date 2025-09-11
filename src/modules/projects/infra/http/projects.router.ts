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
import { CreateTaskController, FindTasksByProjectController } from "@modules/tasks/infra/http/tasks.controller";
import { CreateTaskValidator, FindTasksByProjectValidator } from "@modules/tasks/infra/http/tasks.validator";
import { celebrate } from "celebrate";

export const projectsRouter = Router();

const createProjectsController = new CreateProjectsController();
const findAllProjectsController = new FindAllProjectsController();
const findProjectByIdController = new FindProjectByIdController();
const updateProjectController = new UpdateProjectController();
const deleteProjectController = new DeleteProjectController();
const createTaskController = new CreateTaskController();
const findTasksByProjectController = new FindTasksByProjectController();

projectsRouter.post("/", celebrate(CreateProjectsValidator), createProjectsController.handle);
projectsRouter.get("/", findAllProjectsController.handle);
projectsRouter.get("/:id", celebrate(FindProjectByIdValidator), findProjectByIdController.handle);
projectsRouter.put("/:id", celebrate(UpdateProjectValidator), updateProjectController.handle);
projectsRouter.delete("/:id", celebrate(DeleteProjectValidator), deleteProjectController.handle);

// GET /projects/:projectId/tasks → Lista tasks de um projeto específico
projectsRouter.get("/:projectId/tasks", celebrate(FindTasksByProjectValidator), findTasksByProjectController.handle);

// POST /projects/:projectId/tasks → Cria tarefa vinculada a um projeto
projectsRouter.post("/:projectId/tasks", celebrate(CreateTaskValidator), createTaskController.handle);
