import { EmailService } from "../../../presentation/email/email.service";
import { LogSeverityLevel } from "../../entities/log.entity";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute(to: string): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailService
  ) {}

  async execute(to: string | string[]) {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

      if (!sent) {
        throw new Error("Error sending email");
      }

      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.low,
          message: `Email sent successfully`,
          origin: "send-email-logs.ts",
        })
      );

      return true;
    } catch (error) {
      this.logRepository.saveLog(
        new LogEntity({
          level: LogSeverityLevel.high,
          message: `Error sending email logs: ${error}`,
          origin: "send-email-logs.ts",
        })
      );
      return false;
    }
  }
}
