import { Request, Response, NextFunction } from "express";

export class TypeMiddleware {
  constructor() {}

  public validTypes = (validTypes: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
      // const type = req.params.type;
      const type = req.url.split("/").at(2) || "";

      if (!validTypes.includes(type)) {
        res.status(400).json({ error: "Invalid type" });
        return;
      }

      next();
    };
  };
}
