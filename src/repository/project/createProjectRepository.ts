import { prisma } from "../../../lib/prisma";

export async function createNewProject(projectData: {
  title: string;
  description: string;
  objective: string;
  scope: string;
  stakeholders: string;
  budget: number;
  deadline: Date;
  expectedOutcome: string;
  ownerId: string;
}) {
  const project = await prisma.project.create({
    data: projectData,
    select: {
      id: true,
      title: true,
      description: true,
      objective: true,
      scope: true,
      stakeholders: true,
      budget: true,
      deadline: true,
      expectedOutcome: true,
      createdAt: true,
    },
  });

  return project;
}

export async function addCalendarEvent(projectId: string, deadline: Date) {
  const calendar = await prisma.calendarEvent.create({
    data: {
      projectId,
      title: `Project Deadline`,
      eventType: `Project Deadline`,
      relatedId: projectId,
      date: deadline,
    },
  });

  return calendar;
}
