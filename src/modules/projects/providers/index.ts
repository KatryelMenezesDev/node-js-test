import { container } from "tsyringe";

import { IProjectsRepository } from "@modules/projects/IProjectsRepository";
import { ProjectsRepository } from "@modules/projects/infra/sequelize/Repositories/projectsRepository";

container.registerSingleton<IProjectsRepository>("ProjectsRepository", ProjectsRepository);
