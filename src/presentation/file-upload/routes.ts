import { Router } from "express";
// import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/file-upload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";
export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const controller = new FileUploadController(fileUploadService);

    const typeMiddleware = new TypeMiddleware();

    const fileUploadMiddleware = new FileUploadMiddleware();

    router.use(fileUploadMiddleware.uploadFile);
    // router.use(typeMiddleware.validTypes(["users", "products", "categories"]));

    // Definir las rutas
    router.post("/single/:type", controller.uploadFile);
    router.post(
      "/multiple/:type",
      [typeMiddleware.validTypes(["users", "products", "categories"])],
      controller.uploadMultipleFile
    );

    return router;
  }
}
