import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreayeDeliverymanUseCase {
  async execute({ username, password}: ICreateDeliveryman) {

    // validar se o entregador já existe
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: username,
        }
      }
    })

    if (deliverymanExists) {
      throw new Error("Deliveryman alread exists")
    }

    // Criptografando a senha
    const hasPassword = await hash(password, 10);

    // Salvando o Deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hasPassword,
      }
    });

    return deliveryman;
  }
}