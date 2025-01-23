import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly emailValidated: boolean,
    public readonly password: string,
    public readonly role: string[],
    public readonly img?: string
  ) {}

  static fromObject(object: { [key: string]: any }) {
    const { id, _id, name, email, emailValidated, password, role, img } =
      object;

    if (!id && _id) {
      throw CustomError.badRequest("Id is required");
    }

    if (!name) {
      throw CustomError.badRequest("Name is required");
    }

    if (!email) {
      throw CustomError.badRequest("Email is required");
    }

    if (!!emailValidated) {
      throw CustomError.badRequest("Email validated is required");
    }

    if (!password) {
      throw CustomError.badRequest("Password is required");
    }

    if (!role.length) {
      throw CustomError.badRequest("Role is required");
    }

    return new UserEntity(id, name, email, emailValidated, password, role, img);
  }
}
