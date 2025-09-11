import { container } from "tsyringe";

import { ITasksRepository } from "@modules/tasks/ITasksRepository";
import { TasksRepository } from "@modules/tasks/infra/sequelize/tasksRepository";

container.registerSingleton<ITasksRepository>("TasksRepository", TasksRepository);
