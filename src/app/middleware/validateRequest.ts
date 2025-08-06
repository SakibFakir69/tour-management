import { Schema } from 'mongoose';
import { createUserZodSchema } from "../modules/user/user.validation";

import { NextFunction, Request, Response, Router } from "express";
import { ZodObject, ZodError } from "zod";



// zod validation
export const validateRequest =
  (schema:ZodObject<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      req.body = await schema.parseAsync(req.body);
      console.log("valid",req.body)
      return next();
   
    } catch (error) {

      next(error);
    }
  };
