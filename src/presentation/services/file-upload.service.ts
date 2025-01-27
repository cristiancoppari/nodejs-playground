import path from "path";
import fs from "fs";
import { UploadedFile } from "express-fileupload";
import { Uuid } from "../../config";
import { CustomError } from "../../domain";
export class FileUploadService {
  constructor() {}

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  }

  private readonly uuid = Uuid.generate;

  public uploadSingleFile = async (
    file: UploadedFile,
    folder: string = "",
    validExtensions: string[] = ["jpg", "jpeg", "png", "gif", "pdf"]
  ) => {
    try {
      const fileExtension = file.mimetype.split("/").at(1) || "";
      const isValidExtension = validExtensions.includes(fileExtension);
      if (!isValidExtension) {
        throw CustomError.badRequest("Invalid file extension");
      }
      const destination = path.resolve(__dirname, "../../../", folder);
      this.checkFolder(destination);
      const fileName = `${this.uuid()}.${fileExtension}`;
      file.mv(`${destination}/${fileName}`);
      return { fileName };
    } catch (error) {
      throw error;
    }
  };

  public uploadMultipleFile = async (
    files: UploadedFile[],
    folder: string,
    validExtensions: string[] = ["jpg", "jpeg", "png", "gif", "pdf"]
  ) => {
    const filesUploaded = await Promise.all(
      files.map((file) => this.uploadSingleFile(file, folder, validExtensions))
    );
    return filesUploaded;
  };
}
