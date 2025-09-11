import { Router } from "express";
import {
  CreateUserController,
  UpdateUserController,
  DeleteUserController,
  FindUserByIdController,
} from "@modules/users/infra/http/users.controller";
import {
  CreateUserValidator,
  UpdateUserValidator,
  DeleteUserValidator,
  FindUserByIdValidator,
} from "@modules/users/infra/http/users.validator";
import { celebrate } from "celebrate";

export const usersRouter = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const findUserByIdController = new FindUserByIdController();

usersRouter.post("/", celebrate(CreateUserValidator), createUserController.handle);
usersRouter.get("/:id", celebrate(FindUserByIdValidator), findUserByIdController.handle);
usersRouter.put("/:id", celebrate(UpdateUserValidator), updateUserController.handle);
usersRouter.delete("/:id", celebrate(DeleteUserValidator), deleteUserController.handle);
