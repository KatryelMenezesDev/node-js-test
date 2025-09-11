import { Task } from "@shared/infra/sequelize/models";
import { IBaseRepositorySequelize } from "@shared/repositories/sequelize/IBaseRepository";
import { CreationAttributes } from "sequelize";

export type ITasksRepository = IBaseRepositorySequelize<Task, CreationAttributes<Task>>;

// export interface ITasksRepository extends IBaseRepositorySequelize<Task, CreationAttributes<Task>> {
//   metodosEspecificos(): Promise<Task[]>;
// }
