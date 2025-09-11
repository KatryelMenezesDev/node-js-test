import { Router } from "express";

import { usersRouter } from "@modules/users/infra/http/routes/users.router";
import { tasksRouter } from "@modules/tasks/infra/http/routes/tasks.router";
import { projectsRouter } from "@modules/projects/infra/http/projects.router";

export const router = Router();

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);
router.use("/projects", projectsRouter);
