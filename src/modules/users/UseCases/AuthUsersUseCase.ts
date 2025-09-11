import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/IUsersRepository";
import { IInputAuthUserDTO, IOutputAuthUserDTO } from "@modules/users/dtos/authUserDTO";
import { BadRequestError } from "@utils/AppError";
import { IHashProvider } from "@shared/providers/HashProvider/IHashProvider";
import { ITokenProvider } from "@shared/providers/Tokenprovider/ITokenProvider";

@injectable()
export class AuthUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("TokenProvider")
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(data: IInputAuthUserDTO): Promise<IOutputAuthUserDTO> {
    try {
      const { email, password } = data;

      const user = await this.userRepository.findBy({ email });

      if (!user) {
        throw new BadRequestError("User not found");
      }

      const passwordMatch = await this.hashProvider.compare(password, user.password);

      if (!passwordMatch) {
        throw new BadRequestError("Invalid password");
      }

      const token = await this.tokenProvider.sign({ id: user.id });

      return { user, token };
    } catch (error) {
      console.log(error);
      throw new BadRequestError("Error authenticating user");
    }
  }
}
