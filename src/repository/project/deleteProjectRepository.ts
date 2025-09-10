import { prisma } from "../../../lib/prisma";

export async function deleteProjectById(id: string) {
  const del = await prisma.project.delete({
    where: {
      id: id,
    },
  });
  return del;
}
