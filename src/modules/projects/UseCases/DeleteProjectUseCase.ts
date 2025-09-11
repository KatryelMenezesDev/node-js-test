import { inject, injectable } from "tsyringe";

import { IInputDeleteProjectDTO, IOutputDeleteProjectDTO } from "@modules/projects/dtos/deleteProjectDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class DeleteProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: IInputDeleteProjectDTO): Promise<IOutputDeleteProjectDTO> {
    const existingProject = await this.projectsRepository.findById(data.id);

    if (!existingProject) {
      throw new NotFoundError("Project not found");
    }

    await this.projectsRepository.delete({ id: data.id });

    return {
      message: "Project deleted successfully",
    };
  }
}
