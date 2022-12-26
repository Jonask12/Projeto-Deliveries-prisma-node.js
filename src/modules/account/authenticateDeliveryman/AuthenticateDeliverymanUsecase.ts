import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUserCase {
  async execute( { username, password }: IAuthenticateDeliveryman ) {


    // Verificando se o usuário/cliente já existe no banco de dados
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    })

    if (!deliveryman) {
      throw new Error("Username or password invalid!")
    }
    // Verificando se a senha correspo de ao username
    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    // Gerando o token
    const token = sign({username}, "019acc25a4e242bb77ad489832ada12d", {
      subject: deliveryman.id,
      expiresIn: "1d",
    });

    return token;
  }
}