import { inject, injectable } from "tsyringe";

import { IInputDeleteUserDTO, IOutputDeleteUserDTO } from "@modules/users/dtos/deleteUserDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { IUsersRepository } from "@modules/users/IUsersRepository";

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IInputDeleteUserDTO): Promise<IOutputDeleteUserDTO> {
    try {
      const existingUser = await this.usersRepository.findById(data.id);

      if (!existingUser) {
        throw new NotFoundError("User not found");
      }

      await this.usersRepository.delete({ id: data.id });

      return {
        message: "User deleted successfully",
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error deleting user");
    }
  }
}
