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
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().messages(customMessage("Nome")),
    email: Joi.string().email().optional().messages(customMessage("Email")),
    password: Joi.string().min(6).optional().messages(customMessage("Senha")),
  }),
};

export const AuthUserValidator = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required().messages(customMessage("Email")),
    password: Joi.string().min(6).required().messages(customMessage("Senha")),
  }),
};
