import { Hono } from "hono";
import { delProject } from "../../service/project/deleteProjectService";
import { getToken } from "../../middleware/auth";

export const deleteProject = new Hono();

deleteProject.delete("/project/:id", getToken, async (c) => {
  const id = c.req.param("id");
  try {
    await delProject(id);
    return c.json({ message: "Project Deleted" }, 200);
  } catch (error) {
    return c.json({ message: "Can't Delete Project" }, 500);
  }
});
