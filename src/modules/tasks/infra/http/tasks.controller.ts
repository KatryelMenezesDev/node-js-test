import { Request, Response } from "express";
import { container } from "tsyringe";

// DTOs
import { IInputCreateTaskDTO, IOutputCreateTaskDTO } from "@modules/tasks/dtos/createTaskDTO";
import { IOutputUpdateTaskDTO } from "@modules/tasks/dtos/updateTaskDTO";
import { IOutputDeleteTaskDTO } from "@modules/tasks/dtos/deleteTaskDTO";

// UseCases
import { CreateTaskUseCase } from "@modules/tasks/UseCases/CreateTaskUseCase";
import { UpdateTaskUseCase } from "@modules/tasks/UseCases/UpdateTaskUseCase";
import { DeleteTaskUseCase } from "@modules/tasks/UseCases/DeleteTaskUseCase";

export class CreateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { projectId } = req.params;
    const { title, description }: Omit<IInputCreateTaskDTO, "project_id"> = req.body;
    const createTaskUseCase = container.resolve(CreateTaskUseCase);
    const result: IOutputCreateTaskDTO = await createTaskUseCase.execute({
      project_id: projectId,
      title,
      description,
    });

    return res.status(201).json(result);
  }
}

export class UpdateTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const updateTaskUseCase = container.resolve(UpdateTaskUseCase);
    const result: IOutputUpdateTaskDTO = await updateTaskUseCase.execute({
      id,
      title,
      description,
      status,
    });
    return res.status(200).json(result);
  }
}

export class DeleteTaskController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteTaskUseCase = container.resolve(DeleteTaskUseCase);
    const result: IOutputDeleteTaskDTO = await deleteTaskUseCase.execute({ id });
    return res.status(200).json(result);
  }
}
