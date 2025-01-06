import fs from "fs";

interface SaveFileOptions {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export interface ISaveFileUseCase {
  execute: (options: SaveFileOptions) => void;
}

export class SaveFileUseCase implements ISaveFileUseCase {
  constructor(/** repository */) {}

  execute({
    fileContent,
    fileDestination = "outputs/",
    fileName = "table",
  }: SaveFileOptions): boolean {
    try {
      const outputPath = fileDestination;
      fs.mkdirSync(outputPath, { recursive: true });
      fs.writeFileSync(`${outputPath}${fileName}.txt`, fileContent);
      return true;
    } catch (error) {
      // console.log(error);
      return false;
    }
  }
}
