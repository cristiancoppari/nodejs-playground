import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFileUseCase } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe("ServerApp", () => {
  const options = {
    base: 5,
    limit: 10,
    show: false,
    destination: "outputs/",
    name: "multiplication-table",
  };

  it("should create server app instance", () => {
    const serverApp = new ServerApp();

    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  it("should run ServerApp with options", () => {
    // const logSpy = jest.spyOn(console, "log");
    // const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    // const saveFileSpy = jest.spyOn(SaveFileUseCase.prototype, "execute");
    // ServerApp.run(options);
    // expect(logSpy).toHaveBeenCalledWith("Server running...");
    // expect(logSpy).toHaveBeenCalledWith("File created");
    // expect(createTableSpy).toHaveBeenCalledTimes(1);
    // expect(createTableSpy).toHaveBeenCalledWith({
    //   base: options.base,
    //   limit: options.limit,
    // });
    // expect(saveFileSpy).toHaveBeenCalledTimes(1);
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileContent: expect.any(String),
    //   fileDestination: options.destination,
    //   fileName: options.name,
    // });
  });

  it("should run with custom options", () => {
    const logMock = jest.fn();
    const logErrorMock = jest.fn();
    const createTableMock = jest.fn().mockReturnValue("1 x 2 = 2");
    const saveFileMock = jest.fn().mockReturnValue(true);

    console.log = logMock;
    console.error = logErrorMock;
    CreateTable.prototype.execute = createTableMock;
    SaveFileUseCase.prototype.execute = saveFileMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createTableMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveFileMock).toHaveBeenCalledWith({
      fileContent: "1 x 2 = 2",
      fileDestination: options.destination,
      fileName: options.name,
    });
    expect(logMock).toHaveBeenCalledWith("File created");
    expect(logErrorMock).not.toHaveBeenCalled();
  });
});
