import { Task } from "@shared/infra/sequelize/models";

export interface ITasksRepository {
  create(task: Task): Promise<Task>;
  update(id: string, task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}
