import { updateBookingStatusSchema } from './booking.validation';
import AppError from "../../errorHelpers/appError";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Payment } from "../payment/payment.model";
import { sslService } from "../sslcommerce/sslcomerce.service";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { BOOKING_STATUS, Ibooking } from "./booking.interface";
import { Booking } from "./booking.model";

const getTransactionId = () => {
  return `trans_${Date.now()}_${Math.floor(Math.random() * 100)}`;
};

export const createBooking = async (
  paylod: Partial<Ibooking>,
  userId: string
) => {
  const transactionId = getTransactionId();

  const session = await Booking.startSession();

  session.startTransaction();
  const user = await User.findById(userId, session);

  try {
    if (!user?.phone || !user.address) {
      throw new AppError(400, "please Update Your Profile");
    }

    const tour = await Tour.findById(paylod.tour, session).select("costFrom");

    if (!tour?.costFrom) {
      throw new AppError(400, "No Tour Cost founded");
    }

    const amount = Number(tour.costFrom) * Number(paylod.guessCount!);

    const booking = await Booking.create(
      [
        {
          user: userId,

          status: BOOKING_STATUS.PENDING,
          ...paylod,
        },
      ],
      { session }
    );

    const payment = await Payment.create(
      [
        {
          booking: booking[0]._id,
          status: PAYMENT_STATUS.UNPAID,
          transactionId: transactionId,
          amount: amount,
        },
      ],
      { session }
    );

    const UpdateBooking = await Booking.findByIdAndUpdate(
      booking[0]._id,
      [
        {
          payment: payment[0]._id,
        },
      ],
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("user", "name email  address")
      .populate("tour", "title costFrom")
      .populate("payment");

      const userAddress:string = (UpdateBooking?.user as any).address;
       const userEmail:string
        = (UpdateBooking?.user as any).email;

         const userPhone:string = (UpdateBooking?.user as any).phone;
           const userName:string = (UpdateBooking?.user as any).name;
 


      const sslPayload = {
        address:userAddress,
        phone:userPhone,
        email:userEmail,
        name:userName


      }

      const sslPayment = await sslService.sslPaymentInit(sslPayload);

      console.log(sslPayment);
      



    await session.commitTransaction();
    session.endSession();

    return  {
      payment:sslPayment,
      booking:UpdateBooking
    }


  } catch (error: any) {
    await session.abortTransaction();

    session.endSession();

    throw error;
  }
};

export const getAllUser = () => {
  return {};
};
export const getBookingById = () => {
  return {};
};

export const getAllBooking = () => {
  return {};
};

export const BookingService = {
  createBooking,
};
