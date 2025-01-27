import { Request, Response, NextFunction } from "express";

export class FileUploadMiddleware {
  constructor() {}

  public uploadFile = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({ error: "No files were selected." });
      return;
    }

    if (!Array.isArray(req.files.file)) {
      req.body.files = [req.files.file];
    } else {
      req.body.files = req.files.file;
    }

    next();
  };
}
