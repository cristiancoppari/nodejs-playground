import { LogEntity } from "./log.entity";

import { LogSeverityLevel } from "./log.entity";

describe("log.entity.ts", () => {
  const dataObj = {
    level: LogSeverityLevel.low,
    message: "test",
    origin: "test",
  };

  test("should create a log entity instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a log entity from json", () => {
    const json = '{"level": "low", "message": "test", "origin": "test"}';
    const log = LogEntity.fromJson(json);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogSeverityLevel.low);
    expect(log.message).toBe("test");
    expect(log.origin).toBe("test");
  });

  test("should create a log entity from object", () => {
    const log = LogEntity.fromObject(dataObj);
    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
  });
});
