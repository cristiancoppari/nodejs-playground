import { CheckService } from "../domain/use-cases/checks/check-service";
import { LogRepositoryImplementation } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";

const fileSystemaLogRepository = new LogRepositoryImplementation(
  new FileSystemDatasource()
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

    // emailService.sendEmail({
    //   to: "cristian.coppari.apps@gmail.com",
    //   subject: "Test",
    //   body: "<h1>Test</h1>",
    // });

    new SendEmailLogs(fileSystemaLogRepository, emailService).execute(
      "cristian.coppari.apps@gmail.com"
    );

    emailService.sendEmailWithFileSystemLogs("cristian.coppari.apps@gmail.com");

    CronService.createJob(`*/5 * * * * *`, () => {
      const url = "http://localhost:3001";

      new CheckService(
        fileSystemaLogRepository,
        () => console.log(`${url} is ok`),
        (error) => console.error(error)
      ).execute(url);
    });
  }
}

export default Server;
