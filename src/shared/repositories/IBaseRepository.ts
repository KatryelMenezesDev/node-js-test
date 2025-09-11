export interface IPaginationOptions {
  page: number;
  limit: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IBaseRepository<T, TCreateInput, TWhereUniqueInput, TWhereInput = any> {
  create(data: TCreateInput): Promise<T>;
  findBy(where: TWhereInput): Promise<T | null>;
  findManyBy(where: TWhereInput): Promise<T[]>;
  findManyByPaginated(where: TWhereInput, options: IPaginationOptions): Promise<IPaginatedResult<T>>;
  findAll(): Promise<T[]>;
  update(where: TWhereUniqueInput, data: Partial<T>): Promise<T>;
  updateMany(where: TWhereInput, data: Partial<T>): Promise<{ count: number }>;
  delete(where: TWhereUniqueInput): Promise<void>;
  deleteStrict(where: TWhereUniqueInput): Promise<void>;
  deleteMany(where: TWhereInput): Promise<{ count: number }>;
}
