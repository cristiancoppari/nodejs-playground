import fs from "fs";
import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/entities/log.entity";

describe("file-system.datasource.ts", () => {
  const logPath = path.join(__dirname, "..", "..", "..", "logs");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they don't exist", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["all-logs.log", "high-logs.log", "medium-logs.log"]);
  });

  test("should save a log in all logs all-logs.log", async () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "file-system.datasource.ts",
    });

    await logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in all logs all-logs.log and medium.logs.log", async () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test",
      origin: "file-system.datasource.ts",
    });

    await logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, "utf-8");
    const mediumLogs = fs.readFileSync(`${logPath}/medium-logs.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in all logs all-logs.log and high.logs.log", async () => {
    const logDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test",
      origin: "file-system.datasource.ts",
    });

    await logDatasource.saveLog(log);

    const allLogs = fs.readFileSync(`${logPath}/all-logs.log`, "utf-8");
    const highLogs = fs.readFileSync(`${logPath}/high-logs.log`, "utf-8");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logDatasource = new FileSystemDatasource();

    const logLow = new LogEntity({
      level: LogSeverityLevel.low,
      message: "test",
      origin: "file-system.datasource.ts",
    });

    const logMedium = new LogEntity({
      level: LogSeverityLevel.medium,
      message: "test",
      origin: "file-system.datasource.ts",
    });

    const logHigh = new LogEntity({
      level: LogSeverityLevel.high,
      message: "test",
      origin: "file-system.datasource.ts",
    });

    await logDatasource.saveLog(logLow);
    await logDatasource.saveLog(logMedium);
    await logDatasource.saveLog(logHigh);

    const allLogs = await logDatasource.getLogs(LogSeverityLevel.low);
    const mediumLogs = await logDatasource.getLogs(LogSeverityLevel.medium);
    const highLogs = await logDatasource.getLogs(LogSeverityLevel.high);

    expect(allLogs).toEqual(
      expect.arrayContaining([logLow, logMedium, logHigh])
    );
    expect(mediumLogs).toEqual(expect.arrayContaining([logMedium]));
    expect(highLogs).toEqual(expect.arrayContaining([logHigh]));
  });

  test("should return empty array if there are no logs", async () => {
    const logDatasource = new FileSystemDatasource();

    const logs = await logDatasource.getLogs(LogSeverityLevel.low);

    expect(logs).toEqual([]);
  });

  test("should not throw an error if path exists", () => {
    new FileSystemDatasource();
    new FileSystemDatasource();
  });

  test("should throw an error if severity level is not valid", async () => {
    const logDatasource = new FileSystemDatasource();
    const customSeverityLevel = "custom" as LogSeverityLevel;

    try {
      await logDatasource.getLogs(customSeverityLevel);
    } catch (error) {
      const errorString = `${error}`;
      expect(errorString).toContain("Invalid severity level");
    }
  });
});
