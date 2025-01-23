import { Server } from "../src/presentation/server";
import { envs } from "../src/config/env";
import { AppRoutes } from "../src/presentation/routes";

export const testServer = new Server({
  port: envs.PORT,
  publicPath: envs.PUBLIC_PATH,
  routes: AppRoutes.routes,
});
