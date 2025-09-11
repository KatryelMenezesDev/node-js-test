import { inject, injectable } from "tsyringe";

import { IInputFindTasksByProjectDTO, IOutputFindTasksByProjectDTO } from "@modules/tasks/dtos/findTasksDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { ITasksRepository } from "@modules/tasks/ITasksRepository";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class FindTasksByProjectUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: IInputFindTasksByProjectDTO): Promise<IOutputFindTasksByProjectDTO[]> {
    try {
      const existingProject = await this.projectsRepository.findById(data.project_id);

      if (!existingProject) {
        throw new NotFoundError("Project not found");
      }

      const tasks = await this.tasksRepository.findManyBy({ project_id: data.project_id });
      return tasks;
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error finding tasks by project");
    }
  }
}
