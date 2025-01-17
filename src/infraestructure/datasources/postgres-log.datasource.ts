import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await prismaClient.logModel.create({
      data: {
        message: log.message,
        origin: log.origin,
        level: severityEnum[log.level],
      },
    });

    console.log("Log saved in postgres", newLog);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];

    const dbLogs = await prismaClient.logModel.findMany({
      where: {
        level,
      },
    });

    return dbLogs.map((log) => LogEntity.fromObject(log));
  }
}
