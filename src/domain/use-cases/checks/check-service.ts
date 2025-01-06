interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: Error) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error on check service: ${url}`);
      }

      this.successCallback();
    } catch (error) {
      this.errorCallback(new Error(`Error on check service: ${url}`));

      return false;
    }

    return true;
  }
}
