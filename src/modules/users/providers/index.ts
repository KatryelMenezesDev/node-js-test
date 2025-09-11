import { container } from "tsyringe";

import { IUsersRepository } from "@modules/users/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/sequelize/usersRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
