import { Request, Response } from "express";
import { CreateProductDto, CustomError, PaginationDto } from "../../domain";
import { ProductService } from "../services";
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  };

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    });

    if (error) {
      res.status(400).json({ error });
      return;
    }

    this.productService
      .createProduct(createProductDto!)
      .then((newProduct) => {
        res.status(201).json(newProduct);
        return;
      })
      .catch((error) => {
        this.handleError(error, res);
        return;
      });
  };

  getProducts = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(
      Number(page),
      Number(limit)
    );
    if (error) {
      this.handleError(error, res);
      return;
    }
    this.productService
      .getProducts(paginationDto!)
      .then((products) => {
        res.status(200).json(products);
        return;
      })
      .catch((error) => {
        this.handleError(error, res);
        return;
      });
  };
}
