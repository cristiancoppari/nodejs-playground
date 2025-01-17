import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from "fs";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/all-logs.log";
  // private readonly lowLogsPath = "logs/low-logs.log";
  private readonly mediumLogsPath = "logs/medium-logs.log";
  private readonly highLogsPath = "logs/high-logs.log";

  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    [
      this.allLogsPath,
      // this.lowLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach((path) => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, "");
      }
    });
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = `${JSON.stringify(newLog)}\n`;

    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
    }

    if (newLog.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }

  private getLogsFromFile(path: string): LogEntity[] {
    const content = fs.readFileSync(path, "utf-8");
    if (content === "") return [];
    const logs = content.split("\n").map((log) => LogEntity.fromJson(log));
    return logs;
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsFromFile(this.allLogsPath);
      case LogSeverityLevel.medium:
        return this.getLogsFromFile(this.mediumLogsPath);
      case LogSeverityLevel.high:
        return this.getLogsFromFile(this.highLogsPath);
      default:
        throw new Error("Invalid severity level");
    }
  }
}
