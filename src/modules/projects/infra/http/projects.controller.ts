import { Request, Response } from "express";
import { container } from "tsyringe";
import { IInputCreateProjectsDTO, IOutputCreateProjectsDTO } from "@modules/projects/dtos/createProjectsDTO";

import { CreateProjectsUseCase } from "@modules/projects/UseCases/CreateProjectsUseCase";

export class CreateProjectsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, start_date, end_date }: IInputCreateProjectsDTO = req.body;
    const createProjectsUseCase = container.resolve(CreateProjectsUseCase);
    const result: IOutputCreateProjectsDTO = await createProjectsUseCase.execute({
      name,
      description,
      start_date,
      end_date,
    });

    return res.status(201).json(result);
  }
}
