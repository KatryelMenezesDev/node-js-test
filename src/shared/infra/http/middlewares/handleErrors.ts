import { CelebrateError } from "celebrate";
import { NextFunction, Request, Response } from "express";

import { AppError } from "@utils/AppError";

export const handleErrors = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  if (err instanceof CelebrateError) {
    const errorParams = err.details.get("params");
    if (errorParams) {
      return res.status(400).json({
        status: "Error",
        message: errorParams.message,
      });
    }

    const errorBody = err.details.get("body");
    if (errorBody) {
      return res.status(400).json({
        status: "Error",
        message: errorBody.message,
      });
    }

    const queryError = err.details.get("query");
    if (queryError) {
      return res.status(400).json({
        status: "Error",
        message: queryError.message,
      });
    }
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error: ${err.message}`,
  });
};
