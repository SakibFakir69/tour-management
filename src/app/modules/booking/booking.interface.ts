

// user book 
// id , member , location , 
// payment 
// 1 to many 

import { Types } from "mongoose";


export enum BOOKING_STATUS{
    PENDING="PENDING",
    CANCEL="CANCEL",
    COMPLETE="COMPLETE",
    FAILED="FAILED"
}


export interface Ibooking{
    user:Types.ObjectId,
    tour:Types.ObjectId,
    payment?:Types.ObjectId,
    guessCount:number,
    status:BOOKING_STATUS
}
