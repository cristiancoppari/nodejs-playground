import { LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity } from "../../entities/log.entity";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: Error) => void) | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      this.successCallback?.();

      this.callLogs(
        new LogEntity({
          level: LogSeverityLevel.low,
          message: `Service ${url} is ok`,
          origin: "check-service.ts",
        })
      );

      return true;
    } catch (error) {
      const errorMessage = `${url} - is not ok. ${error}`;

      this.callLogs(
        new LogEntity({
          level: LogSeverityLevel.high,
          message: errorMessage,
          origin: "check-service.ts",
        })
      );

      this.errorCallback?.(new Error(errorMessage));

      return false;
    }
  }

  private async callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }
}
