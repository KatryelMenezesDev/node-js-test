import { Router } from "express";
import {
  UpdateTaskController,
  DeleteTaskController,
  FindAllTasksController,
} from "@modules/tasks/infra/http/tasks.controller";
import { UpdateTaskValidator, DeleteTaskValidator } from "@modules/tasks/infra/http/tasks.validator";
import { celebrate } from "celebrate";
import { Authentication } from "@utils/Authentication";

export const tasksRouter = Router();

const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();
const findAllTasksController = new FindAllTasksController();

tasksRouter.get("/", Authentication, findAllTasksController.handle);
tasksRouter.put("/:id", celebrate(UpdateTaskValidator), Authentication, updateTaskController.handle);
tasksRouter.delete("/:id", celebrate(DeleteTaskValidator), Authentication, deleteTaskController.handle);
