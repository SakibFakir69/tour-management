// handel zod error

import { TErrorSource, TGerriceErrorResponse } from "../interfaces/error.type";

export const handelZodError = (err: any): TGerriceErrorResponse => {
  const errorSource: TErrorSource[] = [];

  err.issue.forEach((issue: any) => {
    errorSource.push({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    });
  });

  return {
    statusCode: 400,
    message: "Zod Error",
    errorSource: errorSource,
  };
};
