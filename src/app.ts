

import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors'
import { UserRoutes } from "./app/modules/user/user.route";
import { envVars } from "./app/modules/config/env";
import { globalError_handler } from "./app/middleware/global.errorhandler";
import { notFound } from "./app/middleware/notFound";
import { authRoutes } from "./app/modules/auth/auth.route";
import router from "./routes";
import cookieParser from 'cookie-parser'
import passport from "passport";
import expressSession from 'express-session'
import "./app/modules/config/passport"
import { title } from "process";
import { url } from "inspector";


const swaggerJDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js Swagger API",
      version: "1.0.0",
      description: "A simple Express API documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:5000", 
      },
    ],
  },
apis: ["./app/modules/**/*.ts", "./app.ts"], 
};

const swagger = swaggerJDoc(options);


const app = express();

app.use('/swagger-api',swaggerUi.serve , swaggerUi.setup(swagger));

app.use(expressSession({
    secret:"your secret",
    resave:false,
    saveUninitialized:false

}))


// passport js

app.use(passport.initialize());
app.use(passport.session());
// session



// cookie parser

app.use(cookieParser());
// json

app.use(express.json());
// cors
app.use(cors());


// api

// app.ts




app.use('/api/v1', router);





app.get('/', async (req :Request, res:Response)=>{
    res.status(200).send('tour server running')

})


// gloabal error handler 

app.use(globalError_handler);


// not founded route 

app.use(notFound);

export default app;


