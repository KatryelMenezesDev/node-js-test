import { WhereOptions, FindOptions, CreationAttributes, Model, Attributes } from "sequelize";

export interface IBaseRepositorySequelize<T extends Model, TCreationAttributes = CreationAttributes<T>> {
  create(data: TCreationAttributes): Promise<T>;
  findBy(where: WhereOptions<T>, options?: FindOptions<T>): Promise<T | null>;
  findManyBy(where: WhereOptions<T>, options?: FindOptions<T>): Promise<T[]>;
  findAll(options?: FindOptions<T>): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  update(where: WhereOptions<T>, data: Partial<Attributes<T>>): Promise<T | null>;
  updateMany(where: WhereOptions<T>, data: Partial<Attributes<T>>): Promise<{ count: number }>;
  delete(where: WhereOptions<T>): Promise<void>;
  deleteMany(where: WhereOptions<T>): Promise<{ count: number }>;
}
