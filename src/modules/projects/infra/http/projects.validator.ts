import { Joi, Segments } from "celebrate";
import { customMessage } from "@utils/CelebrateErro";

export const CreateProjectsValidator = {
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().messages(customMessage("Nome")),
    description: Joi.string().optional().messages(customMessage("Descrição")),
    start_date: Joi.date().optional().messages(customMessage("Data de início")),
    end_date: Joi.date().optional().messages(customMessage("Data de término")),
  }),
};

export const UpdateProjectValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID do projeto")),
  }),
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().messages(customMessage("Nome")),
    description: Joi.string().optional().messages(customMessage("Descrição")),
    start_date: Joi.date().optional().messages(customMessage("Data de início")),
    end_date: Joi.date().optional().messages(customMessage("Data de término")),
    status: Joi.string()
      .valid("pending", "in_progress", "completed", "archived")
      .optional()
      .messages(customMessage("Status")),
  }),
};

export const FindProjectByIdValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID do projeto")),
  }),
};

export const DeleteProjectValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID do projeto")),
  }),
};

export const LinkGithubReposValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID do projeto")),
    username: Joi.string().required().messages(customMessage("Nome de usuário do GitHub")),
  }),
};
