import { inject, injectable } from "tsyringe";

import { IInputDeleteTaskDTO, IOutputDeleteTaskDTO } from "@modules/tasks/dtos/deleteTaskDTO";
import { NotFoundError } from "@utils/AppError";
import { ITasksRepository } from "@modules/tasks/ITasksRepository";

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject("TasksRepository")
    private tasksRepository: ITasksRepository,
  ) {}

  async execute(data: IInputDeleteTaskDTO): Promise<IOutputDeleteTaskDTO> {
    const existingTask = await this.tasksRepository.findById(data.id);

    if (!existingTask) {
      throw new NotFoundError("Task not found");
    }

    await this.tasksRepository.delete({ id: data.id });

    return {
      message: "Task deleted successfully",
    };
  }
}
