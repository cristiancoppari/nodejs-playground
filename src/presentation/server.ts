import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { EmailService } from "./email/email.service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const fsLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImplementation(
  new MongoLogDatasource()
);

const postgresLogRepository = new LogRepositoryImplementation(
  new PostgresLogDatasource()
);

const emailService = new EmailService();

const logHeader = () => {
  console.log("");
  console.log("\x1b[32m--------------------------------\x1b[0m");
  console.log("\x1b[32mServer is running\x1b[0m");
  console.log("\x1b[32m--------------------------------\x1b[0m");
  console.log("");
};

export class Server {
  public static start() {
    logHeader();

    // new SendEmailLogs(fileSystemaLogRepository, emailService).execute(
    //   "cristian.coppari.apps@gmail.com"
    // );

    // emailService.sendEmailWithFileSystemLogs("cristian.coppari.apps@gmail.com");

    CronService.createJob(`*/5 * * * * *`, () => {
      const url = "http://localhost:3001";

      new CheckServiceMultiple(
        [fsLogRepository, mongoLogRepository, postgresLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}

export default Server;
