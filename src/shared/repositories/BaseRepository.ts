import { PrismaClient } from "@prisma/client";
import { IBaseRepository, IPaginationOptions, IPaginatedResult } from "./IBaseRepository";
import { BadRequestError } from "@utils/AppError";
export abstract class BaseRepository<T, TCreateInput, TWhereUniqueInput, TWhereInput = any>
  implements IBaseRepository<T, TCreateInput, TWhereUniqueInput, TWhereInput>
{
  protected prisma: PrismaClient;
  protected abstract modelName: keyof PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create(data: TCreateInput): Promise<T> {
    const model = this.prisma[this.modelName] as any;
    return model.create({ data });
  }

  findBy(where: TWhereInput): Promise<T | null> {
    const model = this.prisma[this.modelName] as any;
    return model.findFirst({ where });
  }

  findManyBy(where: TWhereInput): Promise<T[]> {
    const model = this.prisma[this.modelName] as any;
    return model.findMany({ where });
  }

  async findManyByPaginated(where: TWhereInput, options: IPaginationOptions): Promise<IPaginatedResult<T>> {
    const model = this.prisma[this.modelName] as any;
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await Promise.all([
      model.findMany({
        where,
        skip,
        take: limit,
      }),
      model.count({ where }),
    ]);

    const totalPages = Math.ceil(totalItems / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      data,
      totalItems,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    };
  }

  findAll(): Promise<T[]> {
    const model = this.prisma[this.modelName] as any;
    return model.findMany();
  }

  update(where: TWhereUniqueInput, data: Partial<T>): Promise<T> {
    const model = this.prisma[this.modelName] as any;
    return model.update({ where, data });
  }

  updateMany(where: TWhereInput, data: Partial<T>): Promise<{ count: number }> {
    const model = this.prisma[this.modelName] as any;
    return model.updateMany({ where, data });
  }

  async delete(where: TWhereUniqueInput): Promise<void> {
    const model = this.prisma[this.modelName] as any;

    // Verifica se o registro existe antes de tentar deletar
    const existingRecord = await model.findUnique({ where });

    if (!existingRecord) {
      // Se o registro não existe, não faz nada (operação idempotente)
      return;
    }

    await model.delete({ where });
  }

  async deleteStrict(where: TWhereUniqueInput): Promise<void> {
    const model = this.prisma[this.modelName] as any;

    // Verifica se o registro existe antes de tentar deletar
    const existingRecord = await model.findUnique({ where });

    if (!existingRecord) {
      throw new BadRequestError(`Registro não encontrado para exclusão no modelo ${String(this.modelName)}`);
    }

    await model.delete({ where });
  }

  deleteMany(where: TWhereInput): Promise<{ count: number }> {
    const model = this.prisma[this.modelName] as any;
    return model.deleteMany({ where });
  }
}
