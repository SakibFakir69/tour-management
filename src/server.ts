import { Server } from "http";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/modules/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      envVars.DB_URL
    );

    console.log(envVars.NODE_ENV);

    console.log("connected to DB");

    server = app.listen(envVars.PORT, () => {
      console.log(`localhost:${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};



(async ()=>{
  await startServer();
  await seedSuperAdmin();


})();

// sdlc -> requment
// manuly shout down
// process.on("SIGINT", (error) => {
//   console.log("unhandel rejection error server shut down");

//   console.log(error);

//   if (server) {
//     server.close(() => {
//       process.exit(1);
//     });
//   }

//   process.exit(1);
// });

// Promise.reject(new Error("i forgot to cach this promise"));

// unhandel rejection handel
// uncaught rejection error
// singnal terminator
