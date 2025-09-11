import { container } from "tsyringe";

import { ITasksRepository } from "@modules/tasks/ITasksRepository";
import { TasksRepository } from "@modules/tasks/infra/prisma/Repositories/tasksRepository";

container.registerSingleton<ITasksRepository>("TasksRepository", TasksRepository);
