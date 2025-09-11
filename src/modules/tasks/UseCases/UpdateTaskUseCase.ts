import { inject, injectable } from "tsyringe";

import { IInputUpdateTaskDTO, IOutputUpdateTaskDTO } from "@modules/tasks/dtos/updateTaskDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { ITasksRepository } from "@modules/tasks/ITasksRepository";

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(data: IInputUpdateTaskDTO): Promise<IOutputUpdateTaskDTO> {
    const existingTask = await this.tasksRepository.findById(data.id);

    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }

    const updateData = Object.fromEntries(
      Object.entries({
        title: data.title,
        description: data.description,
        status: data.status,
      }).filter(([, value]) => value !== undefined),
    );

    const updatedTask = await this.tasksRepository.update({ id: data.id }, updateData);

    if (!updatedTask) {
      throw new BadRequestError("Error updating task");
    }

    return updatedTask;
  }
}
