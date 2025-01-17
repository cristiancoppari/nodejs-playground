import { LogEntity } from "../entities/log.entity";
import { LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

describe("log.datasource.ts", () => {
  const newLog = new LogEntity({
    level: LogSeverityLevel.low,
    message: "test",
    origin: "test",
  });

  class LogDatasourceMock extends LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
      return;
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [newLog];
    }
  }

  test("should test the abstract class", async () => {
    const mockLogDatasource = new LogDatasourceMock();

    expect(mockLogDatasource).toBeInstanceOf(LogDatasource);
    expect(typeof mockLogDatasource.saveLog).toBe("function");
    expect(typeof mockLogDatasource.getLogs).toBe("function");

    await mockLogDatasource.saveLog(newLog);

    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);
    expect(logs).toHaveLength(1);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
