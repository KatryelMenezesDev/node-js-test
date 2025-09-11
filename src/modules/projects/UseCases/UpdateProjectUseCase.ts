import { inject, injectable } from "tsyringe";

import { IInputUpdateProjectDTO, IOutputUpdateProjectDTO } from "@modules/projects/dtos/updateProjectDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class UpdateProjectUseCase {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: IInputUpdateProjectDTO): Promise<IOutputUpdateProjectDTO> {
    try {
      const existingProject = await this.projectsRepository.findById(data.id);

      if (!existingProject) {
        throw new NotFoundError("Project not found");
      }

      const updateData = Object.fromEntries(
        Object.entries({
          name: data.name,
          description: data.description,
          start_date: data.start_date,
          end_date: data.end_date,
          status: data.status,
        }).filter(([, value]) => value !== undefined),
      );

      const updatedProject = await this.projectsRepository.update({ id: data.id }, updateData);

      if (!updatedProject) {
        throw new BadRequestError("Error updating project");
      }

      return updatedProject;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error updating project");
    }
  }
}
