import { injectable } from "tsyringe";
import { IUsersRepository } from "@modules/users/IUsersRepository";
import { User } from "@shared/infra/sequelize/models";
import { BaseRepositorySequelize } from "@shared/repositories/sequelize/BaseRepository";

@injectable()
export class UsersRepository extends BaseRepositorySequelize<User> implements IUsersRepository {
  constructor() {
    super(User);
  }
}
