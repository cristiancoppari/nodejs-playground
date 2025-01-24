import { bcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { JwtAdapter } from "../../config";
import { EmailService, SendMailOptions } from "./email.service";
import { envs } from "../../config/envs";
import jwt from "jsonwebtoken";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

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

      // send confirmation email
      this.sendEmailValidationLink(user.email);

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

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });

    if (!token) {
      throw CustomError.internalServerError("Error generating token");
    }

    const link = `${envs.WEBSERVICE_URL}/api/auth/validate-email/${token}`;

    const htmlBody = `
      <h1>Confirm your email</h1>
      <a href="${link}">Confirm your email</a>
    `;

    const options: SendMailOptions = {
      to: email,
      subject: "Confirm your email",
      htmlBody,
    };

    const isSent = await this.emailService.sendEmail(options);

    if (!isSent) {
      throw CustomError.internalServerError("Error sending email");
    }

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken(token);

    if (!payload) {
      throw CustomError.badRequest("Invalid token");
    }

    const { email } = payload as { email: string };

    if (!email) {
      throw CustomError.internalServerError("Email not in token");
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw CustomError.badRequest("User not found");
    }

    user.emailValidated = true;

    await user.save();

    return true;
  };
}
