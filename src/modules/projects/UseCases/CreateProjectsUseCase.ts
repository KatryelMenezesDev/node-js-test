import { inject, injectable } from "tsyringe";

import { IInputCreateProjectsDTO, IOutputCreateProjectsDTO } from "@modules/projects/dtos/createProjectsDTO";
import { BadRequestError } from "@utils/AppError";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class CreateProjectsUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: IInputCreateProjectsDTO): Promise<IOutputCreateProjectsDTO> {
    const project = await this.projectsRepository.create({
      ...data,
      status: "pending",
    });
    return project;
  }
}
