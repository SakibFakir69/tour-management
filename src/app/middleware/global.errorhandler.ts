import { NextFunction, Request, Response } from "express";
import { envVars } from "../modules/config/env";
import AppError from "../errorHelpers/appError";
import mongoose, { mongo } from "mongoose";
import { string } from "zod";
import { handelDuplicate } from "../helpers/handelDuplicateError";
import { handelCastError } from "../helpers/handelCastError";
import { handelZodError } from "../helpers/handelZodError";
import { validationError } from "../helpers/handelValidationrror";
import { TErrorSource } from "../interfaces/error.type";






// validation error



export const globalError_handler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = `Something WentWrong `;

  // mongoess error -> duplicate , cast

  let errorSource: any[] = [
    {
      // path:"isDeleted",
      // message:"Cast Failed"
    },
  ];

  if (err.code === 1100) {
    console.log("duplicate code", err.message);

    const simplifiyError = handelDuplicate(err);

    statusCode = simplifiyError.statusCode;
    message = simplifiyError.message;
  } else if (err.name === "CastError") {
    const simplifiyError = handelCastError(err);

    statusCode = simplifiyError.statusCode;
    message = simplifiyError.message;
  }
  // mongoes validation
  else if (err.name == "ZodError") {

      const simplifiyError =handelZodError(err)

    statusCode = simplifiyError.statusCode;
    // errorSource=simplifiyError.errorSource;
    message=simplifiyError.message;

   
  } else if (err.name === "ValidationError") {

  const simplifiyError = validationError(err)

    statusCode = simplifiyError.statusCode;
    // errorSource=simplifiyError.errorSource as TErrorSource
    message=simplifiyError.message;

  }


 else if (err instanceof AppError) {
    (statusCode = (err.statusCode as number) || 500), (message = err.message);
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
    errorSource: errorSource,
    // find error file or path
  });
};
