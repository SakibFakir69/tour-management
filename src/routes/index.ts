import { Router } from "express";
import { authRoutes } from "../app/modules/auth/auth.route";
import { UserRoutes } from "../app/modules/user/user.route";
import { DivisionRoutes } from "../app/modules/division/division.route";
import { TourRoutes } from "../app/modules/tour/tour.route";
import { bookingRoutes } from "../app/modules/booking/booking.route";
import { paymentRoutes } from "../app/modules/payment/payment.route";


export const router = Router();




const moduleRoute =[

    {
        path:'/user',
        route : UserRoutes,

    },
    {
        path:'/auth',
        route:authRoutes


    },
    {
        path:'/division',
        route:DivisionRoutes
    },
    {
        path:'/tour',
        route : TourRoutes
    },
    {
        path:'/booking',
        route:bookingRoutes
    },
     {
        path:'/payment',
        route:paymentRoutes,
    },


]

moduleRoute.forEach((route)=>{
    router.use(route.path,route.route)
})

export default router;