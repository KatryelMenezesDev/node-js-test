import { Project } from "@shared/infra/sequelize/models";
import { IBaseRepositorySequelize } from "@shared/repositories/sequelize/IBaseRepository";
import { CreationAttributes } from "sequelize";

export type IProjectsRepository = IBaseRepositorySequelize<Project, CreationAttributes<Project>>;
