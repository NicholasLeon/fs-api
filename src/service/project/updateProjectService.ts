import type { updateProjectValidation } from "../../../types/types";
import { updateProjectRepo } from "../../repository/project/updateUserProject";

export async function updateProjectService(
  id: string,
  updateData: updateProjectValidation
) {
  try {
    const project = await updateProjectRepo(id, updateData);
    return project;
  } catch (error) {
    throw new Error("Cant find project");
  }
}
