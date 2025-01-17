import { SendEmailLogs } from "./send-email-logs";
import { EmailService } from "../../../presentation/email/email.service";
import { LogSeverityLevel } from "../../entities/log.entity";
import { LogEntity } from "../../entities/log.entity";
describe("send-email-logs.ts", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockLogRepository,
    mockEmailService as unknown as EmailService
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call sendEmail", async () => {
    const wasSent = await sendEmailLogs.execute("test@test.com");

    expect(wasSent).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: LogSeverityLevel.low,
        message: `Email sent successfully`,
        origin: "send-email-logs.ts",
      })
    );
  });

  test("should call saveLog with error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

    const wasSent = await sendEmailLogs.execute("test@test.com");

    expect(wasSent).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: LogSeverityLevel.high,
        message: expect.any(String),
        origin: "send-email-logs.ts",
      })
    );
  });
});
