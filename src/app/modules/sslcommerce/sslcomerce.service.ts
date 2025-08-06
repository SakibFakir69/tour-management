
import { ISSLComercz } from "./sslcomerce.interface";
import { envVars } from "../config/env";
import axios from "axios";
import AppError from "../../errorHelpers/appError";

const sslPaymentInit =async (payload: Partial<ISSLComercz>) => {
  
    try{
        const data = {
    store_id: envVars.ssl.SSL_STORE_ID,
    store_passwd: envVars.ssl.SSL_STORE_PASS,

    total_amount: payload.amount,
    currency: "BDT",
    tran_id: payload.transaction,

    success_url: `${envVars.ssl.SSL_SUCCESS_BACKEND_URL}?transaction=${payload.transaction}&amount=${payload.amount}&status=success}`,

    fail_url:  `${envVars.ssl.SSL_SUCCESS_BACKEND_URL}?transaction=${payload.transaction}&amount=${payload.amount}&status=fail}`,

    cancel_url:  `${envVars.ssl.SSL_SUCCESS_BACKEND_URL}?transaction=${payload.transaction}&amount=${payload.amount}&status=cancel}`,

    cus_name: payload.name,
    cus_email: payload.email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "8132",
    cus_country: "Bangladesh",
    cus_phone: payload.phoneNumber,
    cus_fax: "01711111111",

    ship_name: payload.name || "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: "1000",
    ship_country: "Bangladesh",

    multi_card_name: "mastercard,visacard,amexcard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D"
  };




  const response = await axios({
    method:"POST",
    url:envVars.ssl.SSL_PAYMENT_API,
    data:data,
    headers:{"Content-Type":"application/x-www-form-urlencoded"},
      


  })
  return response.data;
    }catch(error:any)
    {
        throw new AppError(error , " server error")
    }


};


export const sslService = {
    sslPaymentInit
}