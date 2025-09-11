import { inject, injectable } from "tsyringe";

import { IInputFindProjectByIdDTO, IOutputFindProjectByIdDTO } from "@modules/projects/dtos/findProjectsDTO";
import { NotFoundError } from "@utils/AppError";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class FindProjectByIdUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: IInputFindProjectByIdDTO): Promise<IOutputFindProjectByIdDTO> {
    try {
      const project = await this.projectsRepository.findById(data.id);

      if (!project) {
        throw new NotFoundError("Project not found");
      }

      return project;
    } catch (error) {
      console.log(error);
      throw new NotFoundError("Project not found");
    }
  }
}
