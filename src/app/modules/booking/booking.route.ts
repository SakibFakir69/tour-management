import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { object } from "zod";
import { bookingController } from "./booking.controller";



const router = Router();


// api / v1 / booking
router.post('/', checkAuth(...Object.values(Role)), bookingController.createBooking);


// // api / v1 / booking 
// router.get(' ');
// // api / v1 / mybooking

// router.get('/my-bookins', checkAuth(...Object.values(Role)));

// // api / v1 / booking/id

// router.get('/:bookingId', checkAuth(...Object.values(Role)));

// // api / v1 / bookin/status 

// router.patch('/:bookingId/status', checkAuth(...Object.values(Role)));


export const bookingRoutes = router;
