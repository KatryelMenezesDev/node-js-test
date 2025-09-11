import { inject, injectable } from "tsyringe";

import { IInputUpdateUserDTO, IOutputUpdateUserDTO } from "@modules/users/dtos/updateUserDTO";
import { BadRequestError, NotFoundError } from "@utils/AppError";
import { IUsersRepository } from "@modules/users/IUsersRepository";
import { IHashProvider } from "@shared/providers/HashProvider/IHashProvider";

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  async execute(data: IInputUpdateUserDTO): Promise<IOutputUpdateUserDTO> {
    try {
      const existingUser = await this.usersRepository.findById(data.id);

      if (!existingUser) {
        throw new NotFoundError("User not found");
      }

      if (data.email && data.email !== existingUser.email) {
        const userWithEmail = await this.usersRepository.findBy({ email: data.email });
        if (userWithEmail) {
          throw new BadRequestError("User with this email already exists");
        }
      }

      const updateData = Object.fromEntries(
        Object.entries({
          name: data.name,
          email: data.email,
          password: data.password ? await this.hashProvider.hash(data.password) : undefined,
        }).filter(([, value]) => value !== undefined),
      );

      const updatedUser = await this.usersRepository.update({ id: data.id }, updateData);

      if (!updatedUser) {
        throw new BadRequestError("Error updating user");
      }

      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        created_at: updatedUser.created_at,
        updated_at: updatedUser.updated_at,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error updating user");
    }
  }
}
