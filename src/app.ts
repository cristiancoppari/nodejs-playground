import { Server } from "./presentation/server";
import { envs } from "./config/env";

(() => {
  main();
})();

function main() {
  const server = new Server({
    port: envs.PORT,
    publicPath: envs.PUBLIC_PATH,
  });
  server.start();
}
