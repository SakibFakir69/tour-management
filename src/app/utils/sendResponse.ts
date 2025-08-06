import { Request, Response } from "express";

interface Tmeta {
  total: number;
}

interface Tresponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
  meta?: Tmeta;


}

export const sendResponse = <T>(res: Response, data: Tresponse<T>) => {
  res.status(data.status).json({
    statusCode: data.status,
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};
