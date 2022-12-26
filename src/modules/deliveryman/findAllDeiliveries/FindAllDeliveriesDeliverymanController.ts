import { Request, Response } from "express";

import { FindAllDeliverymanUseCase } from "./FindAlDeliverieslDeliverymanUseCase";

export class FindAllDeliveriesDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;

    const findAllDeliverymanUseCase = new FindAllDeliverymanUseCase();
    const deliveries = await findAllDeliverymanUseCase.execute(id_deliveryman);

    return response.json(deliveries);
  }
}