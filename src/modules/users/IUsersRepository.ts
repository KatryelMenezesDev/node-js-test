import { User } from "@shared/infra/sequelize/models";

export interface IUsersRepository {
  authenticate(email: string, password: string): Promise<User>;
  create(user: User): Promise<User>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
