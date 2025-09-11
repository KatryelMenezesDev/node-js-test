import { User } from "@shared/infra/sequelize/models";
import { IBaseRepositorySequelize } from "@shared/repositories/sequelize/IBaseRepository";
import { CreationAttributes } from "sequelize";

export type IUsersRepository = IBaseRepositorySequelize<User, CreationAttributes<User>>;
