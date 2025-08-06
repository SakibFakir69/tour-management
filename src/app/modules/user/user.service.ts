import { env } from "process";
import AppError from "../../errorHelpers/appError";
import { IAuthProvider, ISactive, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import bcryptjs from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { envVars } from "../config/env";

const createUserService = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;

  const isUserExits = await User.findOne({ email: email });
  console.log(isUserExits, " u");

  // if (isUserExits) {
  //   throw new AppError(400, "user already exits");
  // }
  // hash password

  const hashPassword = await bcryptjs.hash(password as string, 10);
  console.log(hashPassword);

  const authprovider: IAuthProvider = {
    provider: "credintails",
    providerId: email!,
  };

  const user = await User.create({
    password: hashPassword,

    email,
    auths: [authprovider],

    ...rest,
  });

  return user;
};

// update user

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodToken: JwtPayload
) => {
  const isUserExits = await User.findById(userId);

  if (!isUserExits) {
    throw new AppError(404, "user not found");
  }

  if (payload.role) {
    if (decodToken.role === Role.USER || decodToken.role == Role.GUIDE) {
      throw new AppError(403, "You are not authorize");
    }

    if (payload.role === Role.SUPER_ADMIN && decodToken.role === Role.ADMIN) {
      throw new AppError(403, "You are not authorize");
    }
  }
  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodToken.role === Role.USER || decodToken.role == Role.GUIDE) {
      throw new AppError(403, "You are not authorize");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.JWT_SLAT_ROUND
    );
  }

  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdateUser;
};

const getAllUser = async () => {
  const user = await User.find({});

  const totalUsers = await User.countDocuments();

  return {
    data: user,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUserService,
  getAllUser,
  updateUser,
};
