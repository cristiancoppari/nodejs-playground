import nodemailer from "nodemailer";
import { EmailService, EmailServiceOptions } from "./email.service";
import path from "path";

describe("EmailService", () => {
  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const emailService = new EmailService();

  test("should send an email", async () => {
    const options: EmailServiceOptions = {
      to: "test@test.com",
      subject: "Test",
      body: "<h1>Test</h1>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: options.to,
      subject: options.subject,
      html: options.body,
    });
  });

  test("sould send email with attachments", async () => {
    const email = "test@test.com";

    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "Server logs",
      html: expect.any(String),
      attachments: expect.arrayContaining([
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
      ]),
    });
  });
});
