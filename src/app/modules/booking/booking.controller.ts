import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
import { JwtPayload } from "jsonwebtoken";

const createBooking = catchAsync(async (req: Request, res: Response) => {
    const decodeToken = req.user as  JwtPayload;

  const booking = await BookingService.createBooking(req.body , decodeToken.userId );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Booking created Successfully",
    data: booking,
  });
});

const getUserBooking = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingService.getAllUser();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking Retrive Successfully",
    data: bookings,
  });
});

const getSingleBooking = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingService.getBookingById();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking Retrive Successfully",
    data: bookings,
  });
});


const getAllBookings = catchAsync(async(req:Request , res:Response)=>{

    const bookings = await BookingService.getAllBooking();


     sendResponse(res,{
        statusCode:200,
        success:true,
        message:"Booking Retrive Successfully",
        data:bookings,

    })


})


export const bookingController = {
    createBooking,
}