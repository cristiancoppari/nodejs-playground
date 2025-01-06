import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFileUseCase } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
  destination: string;
  name: string;
}

export class ServerApp {
  static run({ base, limit, show, destination, name }: RunOptions) {
    console.log("Server running...");

    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFileUseCase().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: name,
    });

    if (wasCreated) {
      console.log("File created");
    } else {
      console.error("File not created");
    }

    if (show) {
      console.log(table);
    }
  }
}
