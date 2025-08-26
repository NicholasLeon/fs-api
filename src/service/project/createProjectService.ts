import {
  createNewProject,
  addCalendarEvent,
} from "../../repository/project/createProjectRepository";

export async function newProject(projetcData: {
  title: string;
  description: string;
  objective: string;
  scope: string;
  stakeholders: string;
  budget: number;
  deadline: string;
  expectedOutcome: string;
  ownerId: string;
}) {
  try {
    const deadline = new Date(projetcData.deadline);

    const project = await createNewProject({
      ...projetcData,
      deadline,
    });

    await addCalendarEvent(project.id, deadline);

    return { message: "Project Created", project };
  } catch (error) {
    throw new Error("Cant Create Project");
  }
}
