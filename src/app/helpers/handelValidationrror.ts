import mongoose from "mongoose";
import { TErrorSource, TGerriceErrorResponse } from "../interfaces/error.type";



export const validationError = (err: any):TGerriceErrorResponse => {

  const error = Object.values(err.errors);

  const errorSource:TErrorSource[] = [];

  error.forEach((error: any) => {
    errorSource.push({
      path: error.path,
      message: error.message,
    });
  });
 

  return {
    statusCode: 400,
    message: "Validation error",
    errorSource
  };
};
