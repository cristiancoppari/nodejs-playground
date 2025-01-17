import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";
describe("log.model.ts", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should return LogModel", async () => {
    const logData = {
      origin: "test",
      message: "test",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );
  });

  test("should return the schema object", () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        level: {
          type: expect.any(Function),
          enum: ["low", "medium", "high"],
          required: true,
        },
        message: { type: expect.any(Function), required: true },
        createdAt: expect.any(Object),
        origin: { type: expect.any(Function) },
      })
    );
  });
});
