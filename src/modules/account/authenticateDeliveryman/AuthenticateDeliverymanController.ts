import { Request, Response } from "express";
import { AuthenticateDeliverymanUserCase } from "./AuthenticateDeliverymanUsecase";

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateDeliverymanUserCase = new AuthenticateDeliverymanUserCase();
    const result = await authenticateDeliverymanUserCase.execute({
      username,
      password,
    });
   
    return response.json(result);
  }
}