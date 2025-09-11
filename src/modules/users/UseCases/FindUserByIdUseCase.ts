import { inject, injectable } from "tsyringe";

import { IInputFindUserByIdDTO, IOutputFindUserByIdDTO } from "@modules/users/dtos/findUsersDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { IUsersRepository } from "@modules/users/IUsersRepository";

@injectable()
export class FindUserByIdUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IInputFindUserByIdDTO): Promise<IOutputFindUserByIdDTO> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
  }
}
