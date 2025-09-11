import { inject, injectable } from "tsyringe";

import { IOutputFindAllTasksDTO } from "@modules/tasks/dtos/findTasksDTO";
import { BadRequestError } from "@utils/AppError";
import { ITasksRepository } from "@modules/tasks/ITasksRepository";

@injectable()
export class FindAllTasksUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(): Promise<IOutputFindAllTasksDTO[]> {
    const tasks = await this.tasksRepository.findAll();
    return tasks;
  }
}
