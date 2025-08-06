import dotenv from "dotenv";
dotenv.config();
interface Envconfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_EXPIRE: string;
  JWT_ACCESS_SECRECT: string;
  JWT_SLAT_ROUND: string;
  SUPER_ADMIN_PASS: string;
  SUPER_ADMIN_EMAIL: string;
  JWT_REFRESS_SECRECT: string;
  JWT_REFRESS_EXPIRE: string;
  FRON_END_URL: string;
  EXPRESS_SESSION: string;
  GOOGLE_CALL_BACK_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  ssl: {
    SSL_STORE_ID: string;
    SSL_STORE_PASS: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
    SSL_SUCCESS_FRONT_END_URL: string;
    SSL_FAIL_FRONT_URL: string;
    SSSL_CANCEL_FRONT_URL: string;
    SSL_SUCCESS_BACKEND_URL: string;
    SSL_FAIL_BACKEND_URL: string;
    SSL_CANCEL_BACKEND_URL: string;
  };
}

const loadEnvVariables = (): Envconfig => {
  const requiredEnv: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_EXPIRE",
    "JWT_ACCESS_SECRECT",
    "JWT_SLAT_ROUND",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASS",
    "JWT_REFRESS_SECRECT",
    "JWT_REFRESS_EXPIRE",
    "FRON_END_URL",
    "EXPRESS_SESSION",
    "GOOGLE_CALL_BACK_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "SSL_STORE_ID",
    "SSL_STORE_PASS",
    "SSL_PAYMENT_API",
    "SSL_VALIDATION_API",
    "SSL_SUCCESS_FRONT_END_URL",
    "SSL_FAIL_FRONT_URL",
    "SSSL_CANCEL_FRONT_URL",
    "SSL_SUCCESS_BACKEND_URL",
    "SSL_FAIL_BACKEND_URL",
    "SSSL_CANCEL_BACKEND_URL",
  ];
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  return {
    PORT: process.env.PORT!,
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_EXPIRE: process.env.JWT_EXPIRE!,
    JWT_ACCESS_SECRECT: process.env.JWT_ACCESS_SECRECT!,
    JWT_SLAT_ROUND: process.env.JWT_SLAT_ROUND!,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL!,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS!,
    JWT_REFRESS_SECRECT: process.env.JWT_REFRESS_SECRECT!,
    JWT_REFRESS_EXPIRE: process.env.JWT_REFRESS_EXPIRE!,
    FRON_END_URL: process.env.FRON_END_URL!,
    EXPRESS_SESSION: process.env.EXPRESS_SESSION!,
    GOOGLE_CALL_BACK_URL: process.env.GOOGLE_CALL_BACK_URL!,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    ssl: {
      SSL_STORE_ID: process.env.SSL_STORE_ID!,
      SSL_STORE_PASS: process.env.SSL_STORE_PASS!,
      SSL_PAYMENT_API: process.env.SSL_PAYMENT_API!,
      SSL_VALIDATION_API: process.env.SSL_VALIDATION_API!,
      SSL_SUCCESS_FRONT_END_URL: process.env.SSL_SUCCESS_FRONT_END_URL!,
      SSL_FAIL_FRONT_URL: process.env.SSL_FAIL_FRONT_URL!,
      SSSL_CANCEL_FRONT_URL: process.env.SSSL_CANCEL_FRONT_URL!,
      SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL!,
      SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL!,
      SSSL_CANCEL_BACKEND_URL: process.env.SSSL_CANCEL_BACKEND_URL!,
    },
  };
};

export const envVars = loadEnvVariables();
