import { bcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { JwtAdapter } from "../../config";

export class AuthService {
  constructor() {}

  public registerUser = async (registerUserDto: RegisterUserDto) => {
    const existingUser = await UserModel.findOne({
      email: registerUserDto.email,
    });

    if (existingUser) {
      throw CustomError.badRequest("User already exists");
    }

    try {
      const user = new UserModel(registerUserDto);

      // encrypt password
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      // jwt -> keep user logged in
      const token = await JwtAdapter.generateToken({ id: user.id });

      if (!token) {
        throw CustomError.internalServerError("Error generating token");
      }

      // send email

      const { password, ...rest } = UserEntity.fromObject(user);

      return {
        user: { ...rest },
        token,
      };
    } catch (error) {
      throw CustomError.badRequest(`${error}`);
    }
  };

  public loginUser = async (loginUserDto: LoginUserDto) => {
    const user = await UserModel.findOne({
      email: loginUserDto.email,
    });

    if (!user) {
      throw CustomError.badRequest("User not found");
    }

    const isPasswordValid = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw CustomError.badRequest("Invalid password");
    }

    const { password, ...rest } = UserEntity.fromObject(user);

    // jwt -> keep user logged in
    const token = await JwtAdapter.generateToken({ id: user.id });

    if (!token) {
      throw CustomError.internalServerError("Error generating token");
    }

    return {
      user: {
        ...rest,
      },
      token,
    };
  };
}
