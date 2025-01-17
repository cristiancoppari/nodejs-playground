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

  // TODO: fix this test
  // test("should return error if mongo is not connected", async () => {
  //   try {
  //     await MongoDatabase.connect({
  //       mongoUrl: "mongodb://kajsdhkjahsd:ajklshdjkashd@localhost:27017/",
  //       dbName: process.env.MONGO_DB_NAME!,
  //     });
  //     expect(true).toBe(false);
  //   } catch (error) {}
  // });
});
