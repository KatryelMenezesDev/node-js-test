import { inject, injectable } from "tsyringe";

import { IOutputFindAllProjectsDTO } from "@modules/projects/dtos/findProjectsDTO";
import { BadRequestError } from "@utils/AppError";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class FindAllProjectsUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(): Promise<IOutputFindAllProjectsDTO[]> {
    const project = await this.projectsRepository.findAll();
    return project;
  }
}
