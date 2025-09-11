import { Project } from "@shared/infra/sequelize/models";

export interface IUsersRepository {
  findAll(): Promise<Project[]>;
  findById(id: string): Promise<Project>;
  create(project: Project): Promise<Project>;
  update(id: string, project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
}
