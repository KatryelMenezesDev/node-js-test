import { Router } from "express";
import { Authentication } from "@utils/Authentication";
import {
  CreateUserController,
  AuthUserController,
  UpdateUserController,
  DeleteUserController,
  FindUserByIdController,
} from "@modules/users/infra/http/users.controller";
import { CreateUserValidator, AuthUserValidator, UpdateUserValidator } from "@modules/users/infra/http/users.validator";
import { celebrate } from "celebrate";

export const usersRouter = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const findUserByIdController = new FindUserByIdController();

usersRouter.post("/", celebrate(CreateUserValidator), createUserController.handle);
usersRouter.post("/auth", celebrate(AuthUserValidator), authUserController.handle);
usersRouter.get("/", Authentication, findUserByIdController.handle);
usersRouter.put("/", celebrate(UpdateUserValidator), Authentication, updateUserController.handle);
usersRouter.delete("/", Authentication, deleteUserController.handle);
