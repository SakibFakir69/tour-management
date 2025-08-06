
export interface TErrorSource {

  path:string,
  message:string,

}



export interface TGerriceErrorResponse{
  statusCode:number,
  message:string,
  errorSource?:TErrorSource[],


}