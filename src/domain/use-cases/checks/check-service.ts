import { LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity } from "../../entities/log.entity";

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: Error) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      this.logRepository.saveLog(
        new LogEntity(`Service ${url} is ok`, LogSeverityLevel.low)
      );

      this.successCallback?.();

      return true;
    } catch (error) {
      const errorMessage = `${url} - is not ok. ${error}`;

      this.logRepository.saveLog(
        new LogEntity(errorMessage, LogSeverityLevel.high)
      );

      this.errorCallback?.(new Error(errorMessage));

      return false;
    }
  }
}
