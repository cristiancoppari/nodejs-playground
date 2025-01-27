import { v4 as uuid } from "uuid";

export class FileUploadService {
  constructor() {}

  private checkFolder() {
    throw new Error("Not implemented");
  }

  public uploadSingleFile = async (
    file: any,
    folder: string,
    validExtensions: string[] = ["jpg", "jpeg", "png", "gif"]
  ) => {
    throw new Error("Not implemented");
  };

  public uploadMultipleFile = async (
    files: any[],
    folder: string,
    validExtensions: string[] = ["jpg", "jpeg", "png", "gif"]
  ) => {
    throw new Error("Not implemented");
  };
}
