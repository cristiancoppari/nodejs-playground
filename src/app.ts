import Server from "./presentation/server";
import { envs } from "./config/plugins/env.plugin";

console.log(envs.MAILER_EMAIL);

(() => {
  main();
})();

function main() {
  Server.start();
}
