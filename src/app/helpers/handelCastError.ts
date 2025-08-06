

// cast error

import mongoose from "mongoose";
import { TGerriceErrorResponse } from "../interfaces/error.type";

export const handelCastError = (err: mongoose.Error.CastError):TGerriceErrorResponse => {
  console.log(err);
  return {
    statusCode: 400,
    message: "Invalid mongoDB object Id",
  };
};