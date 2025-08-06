import { TGerriceErrorResponse } from "../interfaces/error.type";




// dublicate error
export const handelDuplicate = (err: any):TGerriceErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  return {
    statusCode: 400,
    message: `${match[1]} already exits`,
  };
};