import { container } from "tsyringe";

import { IUsersRepository } from "@modules/users/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/sequelize/Repositories/usersRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
