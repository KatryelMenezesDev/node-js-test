import { Request, Response } from "express";
import { container } from "tsyringe";

// DTOs
import { IInputCreateUserDTO, IOutputCreateUserDTO } from "@modules/users/dtos/createUserDTO";
import { IInputAuthUserDTO, IOutputAuthUserDTO } from "@modules/users/dtos/authUserDTO";
import { IOutputUpdateUserDTO } from "@modules/users/dtos/updateUserDTO";
import { IOutputDeleteUserDTO } from "@modules/users/dtos/deleteUserDTO";
import { IOutputFindUserByIdDTO } from "@modules/users/dtos/findUsersDTO";

// UseCases
import { CreateUserUseCase } from "@modules/users/UseCases/CreateUserUseCase";
import { AuthUsersUseCase } from "@modules/users/UseCases/AuthUsersUseCase";
import { UpdateUserUseCase } from "@modules/users/UseCases/UpdateUserUseCase";
import { DeleteUserUseCase } from "@modules/users/UseCases/DeleteUserUseCase";
import { FindUserByIdUseCase } from "@modules/users/UseCases/FindUserByIdUseCase";
import { User } from "@shared/infra/sequelize/models";

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password }: IInputCreateUserDTO = req.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const result: IOutputCreateUserDTO = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    return res.status(201).json(result);
  }
}

export class AuthUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password }: IInputAuthUserDTO = req.body;
    const authUsersUseCase = container.resolve(AuthUsersUseCase);
    const result: IOutputAuthUserDTO = await authUsersUseCase.execute({
      email,
      password,
    });

    return res.status(200).json(result);
  }
}

export class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user as User;
    const { name, email, password } = req.body;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    const result: IOutputUpdateUserDTO = await updateUserUseCase.execute({
      id,
      name,
      email,
      password,
    });
    return res.status(200).json(result);
  }
}

export class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user as User;
    const deleteUserUseCase = container.resolve(DeleteUserUseCase);
    const result: IOutputDeleteUserDTO = await deleteUserUseCase.execute({ id });
    return res.status(200).json(result);
  }
}

export class FindUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user as User;
    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase);
    const result: IOutputFindUserByIdDTO = await findUserByIdUseCase.execute({ id });
    return res.status(200).json(result);
  }
}
