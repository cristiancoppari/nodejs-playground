import { CheckService } from "./check-service";

describe("check-service.ts", () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockLogRepository,
    mockSuccessCallback,
    mockErrorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call success callback", async () => {
    const wasOk = await checkService.execute("https://google.com");

    expect(wasOk).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();
  });

  test("should call error callback", async () => {
    const wasOk = await checkService.execute("https://googleasd.com");
    expect(wasOk).toBe(false);
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();
  });
});
