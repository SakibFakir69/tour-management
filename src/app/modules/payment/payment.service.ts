import { session } from "passport";
import { validateRequest } from "../../middleware/validateRequest";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";
import AppError from "../../errorHelpers/appError";
import { ISSLComercz } from "../sslcommerce/sslcomerce.interface";
import { sslService } from "../sslcommerce/sslcomerce.service";


const initPayment = async (bookingId:string) => {


  const payment = await Payment.findOne({booking:bookingId});


  if(!payment)
  {
    throw new AppError(404 , "Payment not founded")
  }

  const booking = await Booking.findById(payment.booking);


      const userAddress:string = (booking?.user as any).address;
       const userEmail:string
        = (booking?.user as any).email;

         const userPhone:string = (booking?.user as any).phone;
           const userName:string = (booking?.user as any).name;
 


      const sslPayload:ISSLComercz = {
          address: userAddress,
          phoneNumber: userPhone,
          email: userEmail,
          name: userName,
          // transction
          transaction: payment.transactionId,
          amount: payment.amount,
      }

      const sslPayment = await sslService.sslPaymentInit(sslPayload);

    return{
        payment: sslPayment.gatewayURL,
     
    }


};




const succesPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatePayment = await Payment.findByIdAndUpdate(
      { transaction: query.transaction },
      [
        {
          status: PAYMENT_STATUS.PAID,
        },
      ],
      { session }
    );

    const updateBooking = await Booking.findByIdAndUpdate(
      updatePayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { new: true, runValidators: true, session }
    );
    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Payment Completed Successfully",
    };
  } catch (error) {}
};

const failPayment = async (query: Record<string, string>) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const updatePayment = await Payment.findByIdAndUpdate(
      { transaction: query.transaction },
      [
        {
          status: PAYMENT_STATUS.FAILED,
        },
      ],
      { session }
    );

    const updateBooking = await Booking.findByIdAndUpdate(
      updatePayment?.booking,
      { status: BOOKING_STATUS.FAILED },
      { new: true, runValidators: true, session }
    );

     await session.commitTransaction();
    session.endSession();
    return {
      success: false,
      message: "Payment Failed",
    };
  } catch (error) {}
};


const canclPayment = async (query: Record<string, string>) => {

      const session = await Booking.startSession();
  session.startTransaction();
  try {
    const updatePayment = await Payment.findByIdAndUpdate(
      { transaction: query.transaction },
      [
        {
          status: PAYMENT_STATUS.CANCELLED,
        },
      ],
      { session }
    );

    const updateBooking = await Booking.findByIdAndUpdate(
      updatePayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      
    );
 await session.commitTransaction();
    session.endSession();
    return {
      success: false,
      message: "Payment Cancled",
    };
  } catch (error) {}
};



export const paymentService = {
  succesPayment,
  canclPayment,
  failPayment,
  initPayment
};
