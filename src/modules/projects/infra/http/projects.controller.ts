import { Request, Response } from "express";
import { container } from "tsyringe";

// DTOs
import { IInputCreateProjectsDTO, IOutputCreateProjectsDTO } from "@modules/projects/dtos/createProjectsDTO";
import { IOutputFindAllProjectsDTO, IOutputFindProjectByIdDTO } from "@modules/projects/dtos/findProjectsDTO";
import { IOutputUpdateProjectDTO } from "@modules/projects/dtos/updateProjectDTO";
import { IOutputDeleteProjectDTO } from "@modules/projects/dtos/deleteProjectDTO";
import { IOutputLinkGithubReposDTO } from "@modules/projects/dtos/linkGithubReposDTO";

// UseCases
import { FindAllProjectsUseCase } from "@modules/projects/UseCases/FindAllProjectsUseCase";
import { CreateProjectsUseCase } from "@modules/projects/UseCases/CreateProjectsUseCase";
import { FindProjectByIdUseCase } from "@modules/projects/UseCases/FindProjectByIdUseCase";
import { UpdateProjectUseCase } from "@modules/projects/UseCases/UpdateProjectUseCase";
import { DeleteProjectUseCase } from "@modules/projects/UseCases/DeleteProjectUseCase";
import { LinkGithubReposUseCase } from "@modules/projects/UseCases/LinkGithubReposUseCase";

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

export class FindProjectByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const findProjectByIdUseCase = container.resolve(FindProjectByIdUseCase);
    const result: IOutputFindProjectByIdDTO = await findProjectByIdUseCase.execute({ id });
    return res.status(200).json(result);
  }
}

export class UpdateProjectController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, start_date, end_date, status } = req.body;
    const updateProjectUseCase = container.resolve(UpdateProjectUseCase);
    const result: IOutputUpdateProjectDTO = await updateProjectUseCase.execute({
      id,
      name,
      description,
      start_date,
      end_date,
      status,
    });
    return res.status(200).json(result);
  }
}

export class DeleteProjectController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const deleteProjectUseCase = container.resolve(DeleteProjectUseCase);
    const result: IOutputDeleteProjectDTO = await deleteProjectUseCase.execute({ id });
    return res.status(200).json(result);
  }
}

export class LinkGithubReposController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, username } = req.params;
    const linkGithubReposUseCase = container.resolve(LinkGithubReposUseCase);
    const result: IOutputLinkGithubReposDTO = await linkGithubReposUseCase.execute({
      project_id: id,
      username,
    });
    return res.status(200).json(result);
  }
}
