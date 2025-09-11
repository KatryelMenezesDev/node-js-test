import { injectable } from "tsyringe";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";
import { Project } from "@shared/infra/sequelize/models";
import { BaseRepositorySequelize } from "@shared/repositories/sequelize/BaseRepository";

@injectable()
export class ProjectsRepository extends BaseRepositorySequelize<Project> implements IProjectsRepository {
  constructor() {
    super(Project);
  }
}
