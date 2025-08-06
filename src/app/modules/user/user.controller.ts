import { Request, Response, NextFunction } from "express";

import { User } from "./user.model";
import { UserServices } from "./user.service";
import AppError from "../../errorHelpers/appError";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

// catch async handl  try catch

const createUser = catchAsync(async (req: Request, res: Response) => {
  
  const result = await UserServices.createUserService(req.body);
 

  sendResponse(res, {
    status: 201,
    message: "User cratd succesfully",
    data: result,
    success: true,
  });
});

// get all users

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUser();

  sendResponse(res, {
    success: true,
    status: 200,
    message: "All User Retrive successfully",
    data: result.data,
    meta: result.meta,
  });
});


const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId=  req.params.id;
  // const token = req.headers.authorization;
  // const verfiToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRECT ) as JwtPayload;

  const verfiToken = req.user



  const paylod = req.body;
  const result = await UserServices.updateUser(userId,paylod,verfiToken as JwtPayload) 



  sendResponse(res, {
    success: true,
    status: 200,
    message: "User Updated successfully",
    data: result
    
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  updateUser
};
