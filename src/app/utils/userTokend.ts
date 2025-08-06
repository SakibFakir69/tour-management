import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../modules/config/env";
import { ISactive, IUser } from "../modules/user/user.interface";
import { genrateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelpers/appError";

export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
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

  return {
    accessToken,
    refressToken,
  };
};

export const createNewAccessTokenWithRefressToken = async(refressToken: string) => {
  const verifyFreshToken = verifyToken(
    refressToken,
    envVars.JWT_REFRESS_SECRECT
  ) as JwtPayload;

  const isUserExists = await User.findOne({ email: verifyFreshToken.email });

  if (!isUserExists) {
    throw new AppError(404, " User does not exits");
  }
  if (
    isUserExists.isActive === ISactive.BLOCKED ||
    isUserExists.isActive === ISactive.INACTIVE
  ) {
    throw new AppError(404, "User is blocked");
  }
  if (isUserExists.isDeleted) {
    throw new AppError(404, "User is deleted");
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

  // passwordasd

  return accessToken;
};
