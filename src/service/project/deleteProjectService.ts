import { deleteProjectById } from "../../repository/project/deleteProjectRepository";

export async function delProject(id: string) {
  try {
    await deleteProjectById(id);
  } catch (error) {
    return "Can't find project";
  }
}
