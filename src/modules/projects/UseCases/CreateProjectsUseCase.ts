import { inject, injectable } from "tsyringe";

import { IInputCreateProjectsDTO, IOutputCreateProjectsDTO, ProjectStatus } from "@modules/projects/dtos/createProjectsDTO";
import { BadRequestError } from "@utils/AppError";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class CreateProjectsUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: IInputCreateProjectsDTO): Promise<IOutputCreateProjectsDTO> {
    try {
    const project = await this.projectsRepository.create({
      ...data,
      status: ProjectStatus.PENDING,
      });
      return project;
    } catch (error) {
        console.log(error);
        throw new BadRequestError("Erro ao criar projeto");
    }
  }
}
