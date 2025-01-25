import { Request, Response } from "express";
import { CustomError, PaginationDto } from "../../domain";

export class ProductController {
  // constructor(private readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  createProduct = (req: Request, res: Response) => {
    // const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

    // if (error) {
    //   this.handleError(error, res);
    //   return;
    // }

    // this.categoryService
    //   .createCategory(createCategoryDto!, req.body.user)
    //   .then((newCategory) => {
    //     res.status(201).json(newCategory);
    //   })
    //   .catch((error) => {
    //     this.handleError(error, res);
    //   });

    res.status(201).json({ message: "Product created" });
    return;
  };

  getProducts = async (req: Request, res: Response) => {
    // const { page = 1, limit = 10 } = req.query;
    // const [error, paginationDto] = PaginationDto.create(
    //   Number(page),
    //   Number(limit)
    // );
    // if (error) {
    //   this.handleError(error, res);
    //   return;
    // }
    // this.categoryService
    //   .getCategories(paginationDto!)
    //   .then((categories) => {
    //     res.json(categories);
    //   })
    //   .catch((error) => {
    //     this.handleError(error, res);
    //   });

    res.status(201).json({ message: "Products fetched" });
    return;
  };
}
