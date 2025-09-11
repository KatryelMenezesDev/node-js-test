import { container } from "tsyringe";

import { IProjectsRepository } from "@modules/projects/IProjectsRepository";
import { ProjectsRepository } from "@modules/projects/infra/sequelize/projectsRepository";
import { IRepositoriesRepository } from "@modules/projects/IRepositoriesRepository";
import { RepositoriesRepository } from "@modules/projects/infra/sequelize/repositoriesRepository";

container.registerSingleton<IProjectsRepository>("ProjectsRepository", ProjectsRepository);
container.registerSingleton<IRepositoriesRepository>("RepositoriesRepository", RepositoriesRepository);
