import { Request } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import AppError from "../errorHelpers/appError";

export const genrateToken = (
  payload: JwtPayload,
  screct: string,
  expiresIn?: string
) => {
  const token = jwt.sign(payload, screct, {
    expiresIn: expiresIn,
  } as SignOptions);
  return token;
};


export const verifyToken = (token: string, screct: string) => {
  const verify = jwt.verify(token, screct);

  return verify;
};
