import { Joi, Segments } from "celebrate";
import { customMessage } from "@utils/CelebrateErro";

export const CreateTaskValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    projectId: Joi.string().uuid().required().messages(customMessage("ID do projeto")),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().messages(customMessage("Título")),
    description: Joi.string().optional().messages(customMessage("Descrição")),
  }),
};

export const UpdateTaskValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID da tarefa")),
  }),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().optional().messages(customMessage("Título")),
    description: Joi.string().optional().messages(customMessage("Descrição")),
    status: Joi.string().valid("todo", "in_progress", "done").optional().messages(customMessage("Status")),
  }),
};

export const DeleteTaskValidator = {
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().uuid().required().messages(customMessage("ID da tarefa")),
  }),
};
