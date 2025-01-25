export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(payload: {
    [key: string]: any;
  }): [string?, CreateCategoryDto?] {
    const { name, available = false } = payload;
    let availableBoolean = available;

    if (!name) {
      return ["Name is required", undefined];
    }

    if (typeof available !== "boolean") {
      availableBoolean = available === "true";
    }

    return [undefined, new CreateCategoryDto(name, Boolean(availableBoolean))];
  }
}
