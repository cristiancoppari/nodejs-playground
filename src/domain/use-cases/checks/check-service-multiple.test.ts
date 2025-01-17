import { CheckServiceMultiple } from "./check-service-multiple";

describe("check-service-multiple.ts", () => {
  const mockRepo1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepo2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockRepo3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    [mockRepo1, mockRepo2, mockRepo3],
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
    expect(mockRepo1.saveLog).toHaveBeenCalled();
    expect(mockRepo2.saveLog).toHaveBeenCalled();
    expect(mockRepo3.saveLog).toHaveBeenCalled();
  });

  test("should call error callback", async () => {
    const wasOk = await checkService.execute("https://googleasd.com");
    expect(wasOk).toBe(false);
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();
    expect(mockRepo1.saveLog).toHaveBeenCalled();
    expect(mockRepo2.saveLog).toHaveBeenCalled();
    expect(mockRepo3.saveLog).toHaveBeenCalled();
  });
});
