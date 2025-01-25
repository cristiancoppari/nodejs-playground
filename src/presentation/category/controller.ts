import { Request, Response } from "express";
import { CustomError, CreateCategoryDto, PaginationDto } from "../../domain";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    if (error) {
      this.handleError(error, res);
      return;
    }

    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((newCategory) => {
        res.status(201).json(newCategory);
      })
      .catch((error) => {
        this.handleError(error, res);
      });

    return;
  };

  getCategories = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    const [error, paginationDto] = PaginationDto.create(
      Number(page),
      Number(limit)
    );

    if (error) {
      this.handleError(error, res);
      return;
    }

    this.categoryService
      .getCategories(paginationDto!)
      .then((categories) => {
        res.json(categories);
      })
      .catch((error) => {
        this.handleError(error, res);
      });
  };
}
