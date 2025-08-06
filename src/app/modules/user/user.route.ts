import { Types } from 'mongoose';
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "./user.controller";
import { z } from "zod";
import { createUserZodSchema } from "./user.validation";
import { validateRequest } from "../../middleware/validateRequest";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
import { Role } from "./user.interface";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../config/env";
import { checkAuth } from '../../middleware/checkAuth';
import { authControllers } from '../auth/auth.controller';

const router = Router();



router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserController.createUser
);

router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),

  UserController.getAllUsers
);

router.patch('/:id', checkAuth(...Object.values(Role)), UserController.updateUser)

export const UserRoutes = router;
