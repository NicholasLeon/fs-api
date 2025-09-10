import { Hono } from "hono";
import { serve } from "bun";
import { auth } from "./controller/user/userController";
import { project } from "./controller/project/createProjectController";
import { userProject } from "./controller/project/getUserProjectsController";
import { deleteProject } from "./controller/project/deleteProjectController";
import {
  putArticle,
  putProject,
} from "./controller/project/putProjectController";
import { patchProject } from "./controller/project/patchProjectController";

const app = new Hono();

app.route("/", auth);
app.route("/", project);
app.route("/", userProject);
app.route("/", deleteProject);
app.route("/", putProject);
app.route("/", patchProject);

app.get("/auth", (c) => c.text("Test"));

console.log("Listening on http://localhost:5000");

serve({
  fetch: app.fetch,
  port: 5000,
});
