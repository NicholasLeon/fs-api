import { prisma } from "../../lib/prisma";
import { Prisma } from "../../generated/prisma";

export async function newUser(userData: Prisma.UserCreateInput) {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    },
  });

  return user;
}

export async function findUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
