import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const logRepository = new LogRepositoryImplementation(
  // new FileSystemDatasource()
  // new MongoLogDatasource()
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

      new CheckService(
        logRepository,
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}

export default Server;
