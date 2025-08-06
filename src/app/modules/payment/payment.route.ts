import { Router } from "express";
import { paymentController } from "./payment.controller";




const router = Router();


router.post('/init-payment',paymentController.initPayment)

router.post('/success' ,paymentController.successPayment )
router.post('/fail' ,paymentController.failPayment )
router.post('/cancel' , paymentController.cancelPayment)




export const paymentRoutes = router;






