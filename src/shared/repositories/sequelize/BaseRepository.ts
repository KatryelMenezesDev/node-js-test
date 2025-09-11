import { injectable } from "tsyringe";
import { Model, WhereOptions, FindOptions, ModelStatic, CreationAttributes, Attributes } from "sequelize";
import { IBaseRepositorySequelize } from "@shared/repositories/sequelize/IBaseRepository";

@injectable()
export class BaseRepositorySequelize<T extends Model> implements IBaseRepositorySequelize<T, CreationAttributes<T>> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: CreationAttributes<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findBy(where: WhereOptions<T>, options?: FindOptions<T>): Promise<T | null> {
    return await this.model.findOne({ where, ...options });
  }

  async findManyBy(where: WhereOptions<T>, options?: FindOptions<T>): Promise<T[]> {
    return await this.model.findAll({ where, ...options });
  }

  async findAll(options?: FindOptions<T>): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  async update(where: WhereOptions<T>, data: Partial<Attributes<T>>): Promise<T | null> {
    await this.model.update(data, { where });
    return await this.model.findOne({ where });
  }

  async updateMany(where: WhereOptions<T>, data: Partial<Attributes<T>>): Promise<{ count: number }> {
    const [affectedRows] = await this.model.update(data, { where });
    return { count: affectedRows };
  }

  async delete(where: WhereOptions<T>): Promise<void> {
    await this.model.destroy({ where });
  }

  async deleteMany(where: WhereOptions<T>): Promise<{ count: number }> {
    const affectedRows = await this.model.destroy({ where });
    return { count: affectedRows };
  }
}
