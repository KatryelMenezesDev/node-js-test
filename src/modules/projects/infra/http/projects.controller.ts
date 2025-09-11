import { Request, Response } from "express";
import { container } from "tsyringe";

// DTOs
import { IInputCreateProjectsDTO, IOutputCreateProjectsDTO } from "@modules/projects/dtos/createProjectsDTO";
import { IOutputFindAllProjectsDTO } from "@modules/projects/dtos/findAllProjectsDTO";

// UseCases
import { FindAllProjectsUseCase } from "@modules/projects/UseCases/FindAllProjectsUseCase";
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

export class FindAllProjectsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findAllProjectsUseCase = container.resolve(FindAllProjectsUseCase);
    const result: IOutputFindAllProjectsDTO[] = await findAllProjectsUseCase.execute();
    return res.status(200).json(result);
  }
}
