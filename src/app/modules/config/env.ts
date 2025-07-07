import dotenv from "dotenv";

dotenv.config();

interface Envconfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
}

const loadEnvvariables = (): Envconfig => {
  const requirdedEnv: string[] = ["PORT", "DB_URL", "NODE_ENV"];
  requirdedEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error("missing required enviroment variabler");
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL!,

    NODE_ENV: process.env.NODE_ENV as "development" | "production",
  }
};

export const envVars = loadEnvvariables();