import { Repository } from "@shared/infra/sequelize/models";
import { IBaseRepositorySequelize } from "@shared/repositories/sequelize/IBaseRepository";
import { CreationAttributes } from "sequelize";

export type IRepositoriesRepository = IBaseRepositorySequelize<Repository, CreationAttributes<Repository>>;
