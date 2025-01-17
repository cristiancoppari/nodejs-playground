import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImplementation } from "./log.repository.implementation";
import { LogDatasource } from "../../domain/datasources/log.datasource";

describe("log.repository.implementation.ts", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImplementation(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource saveLog method", async () => {
    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "test",
    });

    await logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  test("getLogs should call the datasource getLogs method", async () => {
    const severityLevel = LogSeverityLevel.low;
    await logRepository.getLogs(severityLevel);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(severityLevel);
  });
});
