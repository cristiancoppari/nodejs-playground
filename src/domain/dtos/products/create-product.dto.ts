export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly isAvailable: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string, // id
    public readonly category: string // id
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, isAvailable, price, description, user, category } = object;

    if (!name) {
      return ["name is required", undefined];
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
        !!isAvailable,
        price,
        description,
        user,
        category
      ),
    ];
  }
}
