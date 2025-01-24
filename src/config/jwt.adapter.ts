import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SECRET = envs.JWT_SECRET;

export class JwtAdapter {
  static generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) {
          return resolve(null);
        }

        return resolve(token);
      });
    });
  }

  validateToken(token: string) {
    throw new Error("Not implemented");
  }
}
