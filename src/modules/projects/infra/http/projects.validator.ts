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
