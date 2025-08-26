import { getToken } from "../../middleware/auth";
import { getUserProjects } from "../../service/project/getUserProjectsService";
import { Hono } from "hono";

export const userProject = new Hono();

userProject.get("/projects", getToken, async (c) => {
  try {
    const user = c.get("jwtPayload");

    if (!user?.id) {
      return c.json({ message: "Unauthorized" }, 400);
    }

    const projects = await getUserProjects(user.id);
    return c.json({ projects }, 200);
  } catch (error) {
    return c.json({ message: "Failed To Get Projects" }, 500);
  }
});
