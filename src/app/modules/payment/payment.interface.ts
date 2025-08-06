import { Types } from "mongoose";

// ref payment


export enum PAYMENT_STATUS{
    PAID="PAID",
    UNPAID="UNPAID",
    CANCELLED="CANCELLED",
    FAILED="FAILED",
    REFUND="REFUND"

}

export interface IPayment {
    booking:Types.ObjectId,
    transactionId:string,
    amount:number,
    paymentGateWayData?:any,
    invoiceUrl?:string,
    status:PAYMENT_STATUS
}