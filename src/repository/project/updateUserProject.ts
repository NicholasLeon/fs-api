import { prisma } from "../../../lib/prisma";
import type { updateProjectValidation } from "../../../types/types";

export async function updateProjectRepo(
  id: string,
  updateData: updateProjectValidation
) {
  const project = await prisma.project.update({
    where: {
      id: id,
    },
    data: updateData,
  });
  return project;
}
