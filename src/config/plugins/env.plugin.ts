import dotenv from "dotenv";
import * as env from "env-var";

dotenv.config();

export const envs = {
  PORT: env.get("PORT").required().asString(),
  MAILER_SERVICE: env.get("MAILER_SERVICE").required().asString(),
  MAILER_EMAIL: env.get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: env.get("MAILER_SECRET_KEY").required().asString(),
  PROD: env.get("PROD").required().asBool(),
};
