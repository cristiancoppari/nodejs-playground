import path from "path";
import fs from "fs";

import { Request, Response } from "express";

export class ImageController {
  constructor() {}

  getImage = (req: Request, res: Response) => {
    const { type = "", image = "" } = req.params;
    const imagePath = path.join(__dirname, `../../../uploads/${type}/${image}`);

    if (!fs.existsSync(imagePath)) {
      res.status(404).json({ error: "Image not found" });
      return;
    }

    res.sendFile(imagePath);
    return;
  };
}
