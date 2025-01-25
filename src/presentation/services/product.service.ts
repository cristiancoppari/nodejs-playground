import { CategoryModel } from "../../data/mongo/models/category.model";
import { ProductModel } from "../../data/mongo/models/product.model";
import {
  CreateCategoryDto,
  CreateProductDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from "../../domain";

export class ProductService {
  constructor() {}

  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    });

    if (productExists) {
      throw CustomError.badRequest("Product already exists");
    }

    try {
      const product = new ProductModel(createProductDto);

      await product.save();

      return product;
    } catch (error) {
      console.error(error);
      throw CustomError.internalServerError("Internal server error");
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [products, total] = await Promise.all([
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("user", "name email")
          .populate("category", "name"),
        ProductModel.countDocuments(),
      ]);

      return {
        products,
        total,
        page,
        limit,
        nextPage: `/api/products?page=${page + 1}&limit=${limit}`,
        prevPage:
          page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
      };
    } catch (error) {
      console.error(error);
      throw CustomError.internalServerError("Internal server error");
    }
  }
}
