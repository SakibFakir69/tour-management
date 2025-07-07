

import express, { Request, Response } from "express";
import mongoose from "mongoose";


const app = express();



app.get('/', async (req :Request, res:Response)=>{
    res.status(200).send('tour server running')

})

export default app;
