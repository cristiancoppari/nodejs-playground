import fs from "fs";

import { SaveFileUseCase } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  const options = {
    fileContent: "custom test content",
    fileName: "custom-table",
    fileDestination: "outputs/custom/",
  };

  afterEach(() => {
    const exists = fs.existsSync("outputs");

    if (exists) {
      fs.rmSync("outputs", { recursive: true });
    }

    const customFolderExists = fs.existsSync(options.fileDestination);

    if (customFolderExists) {
      fs.rmSync(options.fileDestination, { recursive: true });
    }
  });

  it("should save a file with default values", () => {
    const saveFileUseCase = new SaveFileUseCase();

    const result = saveFileUseCase.execute({
      fileContent: "test content",
    });
    const fileExists = fs.existsSync("outputs/table.txt");
    const fileContent = fs.readFileSync("outputs/table.txt", "utf-8");

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe("test content");
  });

  it("should save a file with custom values", () => {
    const saveFileUseCase = new SaveFileUseCase();
    const result = saveFileUseCase.execute(options);
    const fileExists = fs.existsSync(options.fileDestination);
    const fileContent = fs.readFileSync(
      `${options.fileDestination}${options.fileName}.txt`,
      "utf-8"
    );

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it("should return false if dir cannot be created", () => {
    const saveFileUseCase = new SaveFileUseCase();

    const mkdirSpy = jest.spyOn(fs, "mkdirSync");
    mkdirSpy.mockImplementation(() => {
      throw new Error("Error creating directory");
    });

    const result = saveFileUseCase.execute(options);

    expect(result).toBe(false);

    mkdirSpy.mockRestore();
  });

  it("should return false if file cannot be saved", () => {
    const saveFileUseCase = new SaveFileUseCase();

    const writeFileSpy = jest.spyOn(fs, "writeFileSync");
    writeFileSpy.mockImplementation(() => {
      throw new Error("Error saving file");
    });

    const result = saveFileUseCase.execute(options);

    expect(result).toBe(false);

    writeFileSpy.mockRestore();
  });
});
