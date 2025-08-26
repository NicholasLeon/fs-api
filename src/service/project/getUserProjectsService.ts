import { findProjectsByUser } from "../../repository/project/getUserProjectsRepository";

export async function getUserProjects(ownerId: string) {
  try {
    const projects = await findProjectsByUser(ownerId);

    return projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      owner: project.owner.name,
      updatedAt: project.updatedAt,
    }));
  } catch (error) {
    console.error("Error in getProjectsByOwnerId:", error);
    throw new Error("Can't find project");
  }
}
