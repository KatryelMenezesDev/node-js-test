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
import { Authentication } from "@utils/Authentication";

export const projectsRouter = Router();

// Controllers
const createProjectsController = new CreateProjectsController();
const findAllProjectsController = new FindAllProjectsController();
const findProjectByIdController = new FindProjectByIdController();
const updateProjectController = new UpdateProjectController();
const deleteProjectController = new DeleteProjectController();
const createTaskController = new CreateTaskController();
const findTasksByProjectController = new FindTasksByProjectController();

// Routes
projectsRouter.get("/", Authentication, findAllProjectsController.handle);
projectsRouter.get(
  "/:projectId/tasks",
  celebrate(FindTasksByProjectValidator),
  Authentication,
  findTasksByProjectController.handle,
);
projectsRouter.get("/:id", celebrate(FindProjectByIdValidator), Authentication, findProjectByIdController.handle);
projectsRouter.post("/:projectId/tasks", celebrate(CreateTaskValidator), Authentication, createTaskController.handle);
projectsRouter.post("/", celebrate(CreateProjectsValidator), Authentication, createProjectsController.handle);
projectsRouter.put("/:id", celebrate(UpdateProjectValidator), Authentication, updateProjectController.handle);
projectsRouter.delete("/:id", celebrate(DeleteProjectValidator), Authentication, deleteProjectController.handle);
