import { Request, Response, NextFunction, Router } from "express";
import { authControllers } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { object } from "zod";
import { Role } from "../user/user.interface";
import passport from "passport";

const router = Router();


// post 

router.post('/login',authControllers.credintailsLogin)

router.post('/refress-token',authControllers.getNewAccessToken)
router.post('/logout',authControllers.logout)
router.post('/reset-password',checkAuth(...Object.values(Role)), authControllers.restPassword)
router.get('/google', (req:Request,res:Response, next:NextFunction)=>{

   
    const redirect = req.query.redirect  || "/"

    passport.authenticate("google",{scope:["profile","email"] , state:redirect as string})(req,res,next)


})

router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/login"}), authControllers.googleCallbackController )

export const authRoutes = router;
