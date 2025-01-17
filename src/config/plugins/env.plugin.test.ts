import { envs } from "./env.plugin";

describe("env.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: "gmail",
      MAILER_EMAIL: "cristian.coppari.apps@gmail.com",
      MAILER_SECRET_KEY: "cbshveotxyyyegza",
      PROD: false,
      MONGO_URL: "mongodb://bojack-test:123@localhost:27017/",
      MONGO_DB_NAME: "monitor-app-test",
      MONGO_USER: "bojack-test",
      MONGO_PASS: "123",
      POSTGRES_URL:
        "postgresql://bojack-test:123@localhost:5432/monitor-app-db-test",
      POSTGRES_DB: "monitor-app-db-test",
      POSTGRES_USER: "bojack-test",
      POSTGRES_PASSWORD: "123",
    });
  });

  test("should return error if env is not set", async () => {
    jest.resetModules();
    process.env.PORT = "asd";

    try {
      await import("./env.plugin");
      expect(true).toBe(false);
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
