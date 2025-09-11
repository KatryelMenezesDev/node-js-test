import { injectable } from "tsyringe";
import { IRepositoriesRepository } from "@modules/projects/IRepositoriesRepository";
import { Repository } from "@shared/infra/sequelize/models";
import { BaseRepositorySequelize } from "@shared/repositories/sequelize/BaseRepository";

@injectable()
export class RepositoriesRepository extends BaseRepositorySequelize<Repository> implements IRepositoriesRepository {
  constructor() {
    super(Repository);
  }
}
