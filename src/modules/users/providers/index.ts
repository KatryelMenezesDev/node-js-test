import { container } from "tsyringe";

import { IUsersRepository } from "@modules/users/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/prisma/Repositories/usersRepository";

container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);
