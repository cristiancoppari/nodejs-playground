import Server from "./presentation/server";
import { envs } from "./config/plugins/env.plugin";
import { MongoDatabase, LogModel } from "./data/mongo";
import { PrismaClient, SeverityLevel } from "@prisma/client";

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
