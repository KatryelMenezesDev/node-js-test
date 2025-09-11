import { Router } from "express";
import {
  UpdateTaskController,
  DeleteTaskController,
  FindAllTasksController,
} from "@modules/tasks/infra/http/tasks.controller";
import { UpdateTaskValidator, DeleteTaskValidator } from "@modules/tasks/infra/http/tasks.validator";
import { celebrate } from "celebrate";

export const tasksRouter = Router();

const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();
const findAllTasksController = new FindAllTasksController();

// GET /tasks → Lista todas as tasks
tasksRouter.get("/", findAllTasksController.handle);

// PUT /tasks/:id → Atualiza status/título/descrição
tasksRouter.put("/:id", celebrate(UpdateTaskValidator), updateTaskController.handle);

// DELETE /tasks/:id → Remove tarefa
tasksRouter.delete("/:id", celebrate(DeleteTaskValidator), deleteTaskController.handle);
