import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ password, username}: ICreateClient) {
    // validar se o client existe
    const clientExist = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: username
        }
      }
    })

    if (clientExist) {
      throw new Error("Client alread exists")
    }

    const hasPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hasPassword,
      }
    });

    return client;
  }
}
