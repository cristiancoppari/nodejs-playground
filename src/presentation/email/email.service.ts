import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/env.plugin";
import path from "path";
import { Logger } from "winston";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface EmailServiceOptions {
  to: string | string[];
  subject: string;
  body: string;
  attachments?: EmailAttachment[];
}

interface EmailAttachment {
  filename: string;
  path: string;
}

export class EmailService {
  private readonly logRepository: LogRepository;

  constructor(logRepository: LogRepository) {
    this.logRepository = logRepository;
  }

  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  public async sendEmail(options: EmailServiceOptions) {
    const { to, subject, body, attachments } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: body,
        attachments,
      });

      if (sentInformation.accepted.length > 0) {
        const log = new LogEntity({
          level: LogSeverityLevel.low,
          origin: "email.service.ts",
          message: "Email sent successfully",
        });

        this.logRepository.saveLog(log);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  sendEmailWithFileSystemLogs(to: string) {
    const subject = "Server logs";

    const body = `
      <h1>Server logs</h1>
      <p>Here are the logs of the server</p>
    `;

    const attachments: EmailAttachment[] = [
      {
        filename: "all-logs.log",
        path: path.join(__dirname, "../../../logs/all-logs.log"),
      },
      {
        filename: "medium-logs.log",
        path: path.join(__dirname, "../../../logs/medium-logs.log"),
      },
      {
        filename: "high-logs.log",
        path: path.join(__dirname, "../../../logs/high-logs.log"),
      },
    ];

    this.sendEmail({ to, subject, body, attachments });
  }
}
