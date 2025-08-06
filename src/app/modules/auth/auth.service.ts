import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
import { genrateToken, verifyToken } from "../../utils/jwt";
import {
  createNewAccessTokenWithRefressToken,
  createUserToken,
} from "../../utils/userTokend";
import { envVars } from "../config/env";
import { ISactive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcyprtjs from "bcryptjs";

const credintailsLoginAuth = async (payload: Partial<IUser>) => {
  const { password, email } = payload;

  console.log(password, email);

  const isUserExists = await User.findOne({ email });

  console.log(isUserExists, " u 2");

  if (!isUserExists) {
    throw new AppError(400, "User not found");
  }

  if (!password) {
    throw new AppError(400, "Password is required");
  }

  const isPassword = await bcyprtjs.compare(
    password,
    isUserExists.password as string
  );

  if (!isPassword) {
    throw new AppError(400, "Incorrect password");
  }

  const jwtPayload = {
    userId: isUserExists._id,
    email: isUserExists.email,
    role: isUserExists.role,
  };

  const accessToken = genrateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRECT as string,
    envVars.JWT_EXPIRE
  );
  const refressToken = genrateToken(
    jwtPayload,
    envVars.JWT_REFRESS_SECRECT,
    envVars.JWT_REFRESS_EXPIRE
  );

  // password

  const userToken = createUserToken(isUserExists);

  const userData = isUserExists.toObject(); // convert mongoose doc to plain object
  delete userData.password;

  return {
    accessToken: userToken.accessToken,
    refressToken: userToken.refressToken,
    user: userData,
  };
};

const getNewAccessToken = async (refressToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefressToken(
    refressToken
  );

  return {
    accessToken: newAccessToken,
  };
};

// reset password

const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  decodeToken: JwtPayload
) => {
  const user = await User.findById(decodeToken.userId);
  console.log(user);

  const isOldPasswordMatched = await bcyprtjs.compare(
    oldPassword,
    user?.password as string
  );

  if (!isOldPasswordMatched) {
    throw new AppError(403, " old password does not match");
  }

  user!.password = await bcyprtjs.hash(
    newPassword,
    Number(envVars.JWT_SLAT_ROUND)
  );

  await user!.save();

  return true;
};

export const authServices = {
  credintailsLoginAuth,
  getNewAccessToken,
  resetPassword,
};
