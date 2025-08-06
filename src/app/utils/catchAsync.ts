

import { Request, Response, NextFunction } from "express";

type Asynchandler = (req:Request, res:Response, next:NextFunction)=> Promise<any>;
// promise 

export const catchAsync = (fn:Asynchandler)=>  (req:Request, res:Response, next:NextFunction)=>{


    Promise.resolve(fn(req,res,next)).catch((error:any)=>{

        next(error);

    })



}
