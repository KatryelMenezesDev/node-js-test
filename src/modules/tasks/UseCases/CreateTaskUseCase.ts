import { inject, injectable } from "tsyringe";

import { IInputCreateTaskDTO, IOutputCreateTaskDTO } from "@modules/tasks/dtos/createTaskDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { ITasksRepository } from "@modules/tasks/ITasksRepository";
import { IProjectsRepository } from "@modules/projects/IProjectsRepository";

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
  ) {}

  async execute(data: IInputCreateTaskDTO): Promise<IOutputCreateTaskDTO> {
    try {
      // Verificar se o projeto existe
      const existingProject = await this.projectsRepository.findById(data.project_id);

      if (!existingProject) {
        throw new NotFoundError("Project not found");
      }

      const task = await this.tasksRepository.create({
        ...data,
        status: "todo",
      });
      return task;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new BadRequestError("Error creating task");
    }
  }
}
