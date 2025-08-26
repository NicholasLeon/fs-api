import { zValidator } from "@hono/zod-validator";
import { newProject } from "../../service/project/createProjectService";
import { Hono } from "hono";
import { z } from "zod";
import { getToken } from "../../middleware/auth";

const projectValidation = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  objective: z.string().min(1),
  scope: z.string().min(1),
  stakeholders: z.string().min(1),
  budget: z.number().nonnegative(),
  deadline: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }), // Make sure deadline is a string
  expectedOutcome: z.string().min(1),
});

export const project = new Hono();

project.use("/project", getToken);

project.post("/project", zValidator("json", projectValidation), async (c) => {
  try {
    const {
      title,
      description,
      objective,
      scope,
      stakeholders,
      budget,
      deadline,
      expectedOutcome,
    } = c.req.valid("json");

    const user = c.get("jwtPayload");
    const ownerId = user.id;

    const project = await newProject({
      title,
      description,
      objective,
      scope,
      stakeholders,
      budget,
      deadline,
      expectedOutcome,
      ownerId,
    });
    return c.json({ message: "Project Created", project }, 201);
  } catch (error) {
    return c.json({ error: "Internal Server Error" }, 500);
  }
});
