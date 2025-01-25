import { NextFunction, Request, Response } from "express";
// import { CustomError } from "../../domain/errors/custom.error";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserEntity } from "../../domain";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");

    if (!authorization) {
      // throw CustomError.unauthorized("Token is required");
      res.status(401).json({
        message: "Token is required",
      });
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({
        message: "Invalid Bearer token",
      });
      return;
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);

      if (!payload) {
        res.status(401).json({
          message: "Invalid token",
        });
        return;
      }

      const user = await UserModel.findById(payload.id);

      if (!user) {
        res.status(401).json({
          message: "User not found",
        });
        return;
      }

      req.body.user = UserEntity.fromObject(user);
      next();
    } catch (error) {
      console.log({ error });
      res.status(500).json({
        message: "Internal server error",
      });
      return;
    }
  }
}
