import { catchAsync } from "../../utils/catchAsync";

import { Request, Response, NextFunction } from "express";

import { sendResponse } from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import AppError from "../../errorHelpers/appError";
import { setAuthCookie } from "../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserToken } from "../../utils/userTokend";
import { envVars } from "../config/env";
import passport from "passport";

const credintailsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", async (error: any, user: any, info: any) => {
      if (error) {
        return next(new AppError(401, error));
      }
      if (!user) {
          return next(new AppError(401, info.message));
      }
      const userToken = await createUserToken(user);

      const logInfo = await authServices.credintailsLoginAuth(req.body);

      const {password:pass , ...rest} = user.toObject();

      // cookies
      setAuthCookie(res, userToken);


      sendResponse(res, {
        status: 201,
        message: "Login  succesfully",
        data: 
         {
          accessToken:userToken.accessToken,
          refreshToken:userToken.refressToken,
          user:rest,
         },


        success: true,
      });
    })(req, res, next);
  }
);

// refress token

export const getNewAccessToken = catchAsync(
  async (req: Request, res: Response) => {
    const refressToken = req.cookies.refressToken;
    console.log(refressToken);

    if (!refressToken) {
      throw new AppError(404, "not recive cookies");
    }

    const toknInfo = await authServices.getNewAccessToken(
      refressToken as string
    );

    setAuthCookie(res, toknInfo);

    sendResponse(res, {
      status: 201,
      message: "New access token retrive succesesfully",
      data: toknInfo,
      success: true,
    });
  }
);

// log out

export const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  res.clearCookie("refressToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  sendResponse(res, {
    status: 201,
    message: "Login  succesfully",
    data: null,
    success: true,
  });
});

export const restPassword = catchAsync(async (req: Request, res: Response) => {
  const newPasswords = req.body.newPassword;
  const oldPasswordd = req.body.oldPassword;
  const decodeToken = req.user;

  console.log(decodeToken, newPasswords, oldPasswordd);

  if (!decodeToken) {
    throw new AppError(403, " not founded");
  }

  await authServices.resetPassword(oldPasswordd, newPasswords, decodeToken);

  sendResponse(res, {
    status: 201,
    message: "Password changed Successfully",
    data: null,
    success: true,
  });
});

// googl call back controller

export const googleCallbackController = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;

    let state = req.query.state ? (req.query.state as string) : "";

    if (state.startsWith("/")) {
      state.slice(1);
    }

    console.log(user);
    if (!user) {
      throw new AppError(404, " User not founded");
    }
    const tokenInfo = createUserToken(user);

    setAuthCookie(res, tokenInfo);

    res.redirect(`${envVars.FRON_END_URL}/${state}`);
  }
);

export const authControllers = {
  credintailsLogin,
  getNewAccessToken,
  logout,
  restPassword,
  googleCallbackController,
};
