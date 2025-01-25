import { Validators } from "../../../config";

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // id
    public readonly category: string // id
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object;

    if (!name) {
      return ["name is required", undefined];
    }

    if (!Validators.isMongoID(user)) {
      return ["user is not a valid id", undefined];
    }

    if (!Validators.isMongoID(category)) {
      return ["category is not a valid id", undefined];
    }

    if (!user) {
      return ["user is required", undefined];
    }
    if (!category) {
      return ["category is required", undefined];
    }

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
