import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { updateProjectService } from "../../service/project/updateProjectService";
import { projectUpdateValidation } from "../../../types/types";
import { getToken } from "../../middleware/auth";

export const patchArticle = new Hono();

patchArticle.use("/:id", getToken);
patchArticle.patch(
  "/:id",
  zValidator("json", projectUpdateValidation),
  async (c) => {
    const { id } = c.req.param();
    const body = c.req.valid("json");

    try {
      const project = await updateProjectService(id, body);
      return c.json({ message: "Project Updated", project }, 200);
    } catch (error) {
      return c.json({ message: "Can't update project" }, 500);
    }
  }
);

export const putArticle = new Hono();
