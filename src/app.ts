import Server from "./presentation/server";
import { envs } from "./config/plugins/env.plugin";
import { MongoDatabase } from "./data/mongo";

(async () => {
  initMongo();
  // initPrisma();
  main();
})();

function main() {
  Server.start();
}

function initMongo() {
  MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
}
