import { Joi, Segments } from "celebrate";
import { customMessage } from "@utils/CelebrateErro";

export const CreateUserValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("Nome")),
    email: Joi.string().email().required().messages(customMessage("Email")),
    password: Joi.string().min(6).required().messages(customMessage("Senha")),
  }),
};

export const UpdateUserValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID do usuário")),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().messages(customMessage("Nome")),
    email: Joi.string().email().optional().messages(customMessage("Email")),
    password: Joi.string().min(6).optional().messages(customMessage("Senha")),
  }),
};

export const DeleteUserValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID do usuário")),
  }),
};

export const FindUserByIdValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID do usuário")),
  }),
};
