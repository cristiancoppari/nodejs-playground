import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("mongo.init.ts", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("should connect to mongodb", async () => {
    const connected = await MongoDatabase.connect({
      mongoUrl: process.env.MONGO_URL!,
      dbName: process.env.MONGO_DB_NAME!,
    });
    expect(connected).toBe(true);
  });

  test("should return error if mongo is not connected", async () => {
    try {
      await MongoDatabase.connect({
        mongoUrl: "mongodb://localhost:27017/",
        dbName: "monitor-app-test",
      });
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
