/* eslint-disable @typescript-eslint/no-empty-object-type */
import { plans, Prisma } from "@prisma/client";
import { IBaseRepository } from "@shared/repositories/IBaseRepository";

export interface IUsersRepository
  extends IBaseRepository<plans, Prisma.plansCreateInput, Prisma.plansWhereUniqueInput, Prisma.plansWhereInput> {}
