import { container } from "tsyringe";

import { IProjectsRepository } from "@modules/projects/IProjectsRepository";
import { ProjectsRepository } from "@modules/projects/infra/sequelize/projectsRepository";

container.registerSingleton<IProjectsRepository>("ProjectsRepository", ProjectsRepository);
