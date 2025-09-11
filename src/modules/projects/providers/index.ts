import { container } from "tsyringe";

import { IProjectsRepository } from "@modules/projects/IPlansRepository";
import { ProjectsRepository } from "@modules/projects/infra/prisma/Repositories/projectsRepository";

container.registerSingleton<IProjectsRepository>("ProjectsRepository", ProjectsRepository);
