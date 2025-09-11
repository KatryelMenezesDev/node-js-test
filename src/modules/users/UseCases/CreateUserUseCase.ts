import { inject, injectable } from "tsyringe";

import { IInputCreateUserDTO, IOutputCreateUserDTO } from "@modules/users/dtos/createUserDTO";
import { BadRequestError } from "@utils/AppError";
import { IUsersRepository } from "@modules/users/IUsersRepository";
import { IHashProvider } from "@shared/providers/HashProvider/IHashProvider";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: IInputCreateUserDTO): Promise<IOutputCreateUserDTO> {
    const existingUser = await this.usersRepository.findBy({ email: data.email });

    if (existingUser) {
      throw new BadRequestError("User with this email already exists");
    }

    const hashedPassword = await this.hashProvider.hash(data.password);

    const user = await this.usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
