import { Request, Response } from "express";
import { CustomError, CreateCategoryDto } from "../../domain";

export class CategoryController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  createCategory = async (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) {
      this.handleError(error, res);
      return;
    }

    res.json(createCategoryDto);
    return;
  };

  getCategories = async (req: Request, res: Response) => {
    res.json("Categories");
    return;
  };
}
