import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUserCase {
  async execute( { username, password }: IAuthenticateClient ) {


    // Verificando se o usuário/cliente já existe no banco de dados
    const client = await prisma.clients.findFirst({
      where: {
        username
      }
    })

    if (!client) {
      throw new Error("Username or password invalid!")
    }
    // Verificando se a senha correspo de ao username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    // Gerando o token
    const token = sign({username}, "019acc25a4e242bb55ad489832ada12d", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}