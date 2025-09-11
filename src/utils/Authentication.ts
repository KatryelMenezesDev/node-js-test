import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { User } from "../shared/infra/sequelize/models/User";
import { UnauthorizedError } from "./AppError";

type JwtPayload = {
  id: string;
};

declare module "express" {
  interface Request {
    user: User;
  }
}

export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Unauthorized!");
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload;

    const user = await User.findByPk(id);

    if (!user) {
      throw new UnauthorizedError("Unauthorized!");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError("Unauthorized!");
  }
};
