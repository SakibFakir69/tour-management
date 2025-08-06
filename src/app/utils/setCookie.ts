import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
  refressToken?: string;
}

export const setAuthCookie = (res: Response, tokeninfo: AuthTokens) => {

  if (tokeninfo.accessToken) {
    res.cookie("refressToken", tokeninfo.refressToken, {
      httpOnly: true,
      secure: false,
    });
  }


  if(tokeninfo.refressToken){
    res.cookie("accessToken", tokeninfo.accessToken, {
      httpOnly: true,
      secure: false,
    });

  }
};
