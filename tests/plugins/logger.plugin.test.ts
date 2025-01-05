import { buildLogger, logger as winstonLogger } from "../../src/plugins";

describe("Test in logger.plugin.ts", () => {
  test("buildLogger should return a function", () => {
    const logger = buildLogger("test");

    expect(typeof logger.log).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  test("logger.log should log a message", () => {
    const message = "test message";
    const service = "test service";
    const spy = jest.spyOn(winstonLogger, "log");
    const logger = buildLogger(service);
    logger.log(message);
    expect(spy).toHaveBeenCalledWith(
      "info",
      expect.objectContaining({
        level: "info",
        message,
        service,
      })
    );
  });
});
