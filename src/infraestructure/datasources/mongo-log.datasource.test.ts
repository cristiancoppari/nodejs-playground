import { LogModel, MongoDatabase } from "../../data/mongo";
import { envs } from "../../config/plugins/env.plugin";
import { MongoLogDatasource } from "./mongo-log.datasource";
import mongoose from "mongoose";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("mongo-log.datasource.ts", () => {
  const logDataSource = new MongoLogDatasource();
  const log = new LogEntity({
    level: LogSeverityLevel.low,
    message: "test",
    origin: "mongo-log.datasource.ts",
    createdAt: new Date(),
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalledWith("New log saved in Mongo");
  });

  test("should get logs", async () => {
    await logDataSource.saveLog(log);

    const logs = await logDataSource.getLogs(LogSeverityLevel.low);

    expect(logs.length).toBe(1);
  });
});
