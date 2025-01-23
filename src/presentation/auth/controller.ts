import { Request, Response } from "express";

export class AuthController {
  constructor() {}

  register = async (req: Request, res: Response) => {
    res.json("register user");
  };

  login = async (req: Request, res: Response) => {
    res.json("login user");
  };

  validateEmail = async (req: Request, res: Response) => {
    res.json("validate email");
  };
}
