import { injectable } from "tsyringe";
import { ITasksRepository } from "@modules/tasks/ITasksRepository";
import { Task } from "@shared/infra/sequelize/models";
import { BaseRepositorySequelize } from "@shared/repositories/sequelize/BaseRepository";

@injectable()
export class TasksRepository extends BaseRepositorySequelize<Task> implements ITasksRepository {
  constructor() {
    super(Task);
  }
}
