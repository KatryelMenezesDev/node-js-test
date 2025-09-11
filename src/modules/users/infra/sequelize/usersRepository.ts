import { injectable } from "tsyringe";
import { IUsersRepository } from "@modules/users/IUsersRepository";
import { BadRequestError } from "@utils/AppError";
import { User } from "@shared/infra/sequelize/models";

@injectable()
export class UsersRepository implements IUsersRepository {
  async create(user: User): Promise<User> {
    return await User.create(user);
  }
  async update(id: string, user: User): Promise<User> {
    await User.update(user, { where: { id } });
    const updatedUser = await User.findByPk(id);
    if (!updatedUser) {
      throw new BadRequestError("Usuário não encontrado após atualização");
    }
    return updatedUser;
  }
  async delete(id: string): Promise<void> {
    await User.destroy({ where: { id } });
  }
  async authenticate(email: string, password: string): Promise<User> {
    const user = await User.findOne({ where: { email, password } });
    if (!user) {
      throw new BadRequestError("Credenciais inválidas");
    }
    return user;
  }
  async findAll(): Promise<User[]> {
    return await User.findAll();
  }
  async findById(id: string): Promise<User> {
    const user = await User.findByPk(id);
    if (!user) {
      throw new BadRequestError("Usuário não encontrado");
    }
    return user;
  }
}
