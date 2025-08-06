
import { NextFunction, Request, Response, Router } from "express";
import AppError from "../errorHelpers/appError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../modules/config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRole :string[])=> async (req: Request, res: Response, next: NextFunction) => {

  try {
    const token = req.headers.authorization;
    

    if (!token) {
      throw new AppError(403, " not found access token");
    }

    const tokenVerify = verifyToken(token, envVars.JWT_ACCESS_SECRECT) as JwtPayload;

    if(!authRole.includes(tokenVerify.role)){
      throw new AppError(403, " You are not premitted this route")
    }

    console.log(tokenVerify , " verifytioken");

    req.user=tokenVerify;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
