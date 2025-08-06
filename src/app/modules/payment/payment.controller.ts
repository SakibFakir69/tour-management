import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentService } from "./payment.service";
import { string } from "zod";
import { envVars } from "../config/env";
import { sendResponse } from "../../utils/sendResponse";




const initPayment= catchAsync(async (req: Request, res: Response) => {
   const bookingId = req.params.bookingId as any;
   
   const result = paymentService.initPayment(bookingId);

  const query = req.query;



  sendResponse(res,{
    status:200,
    success:true,
    message:"Booking done Successfully",
    data:result,

  })

  
});


const  successPayment = catchAsync(async (req: Request, res: Response) => {
  
  const query = req.query;
  const result = await paymentService.succesPayment(
    query as Record<string, string>
  );

  if (result?.success) {
    res.redirect(`${envVars.ssl.SSL_SUCCESS_FRONT_END_URL}?transaction=${query.transaction}
            
            message=${result.message} amount=${query.amount}&status=${query.status}},`);
  }


});

const failPayment = catchAsync(async (req: Request, res: Response) => {
      const query = req.query;
  const result = await paymentService.failPayment(
    query as Record<string, string>
  );

  if (!result?.success) {
    res.redirect(`${envVars.ssl.SSL_SUCCESS_FRONT_END_URL}?transaction=${query.transaction}
            
            message=${result.message} amount=${query.amount}&status=${query.status}},`);
  }

});



const cancelPayment = catchAsync(async (req: Request, res: Response) => {
      const query = req.query;
  const result = await paymentService.canclPayment(
    query as Record<string, string>
  );

  if (!result?.success) {
    res.redirect(`${envVars.ssl.SSL_SUCCESS_FRONT_END_URL}?transaction=${query.transaction}
            
            message=${result.message} amount=${query.amount}&status=${query.status}},`);
  }
});
 


export const paymentController = {
  successPayment ,
  initPayment,
  cancelPayment,
  failPayment,
};
