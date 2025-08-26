import { Hono } from "hono";
import { serve } from "bun";
import { auth } from "./controller/user/userController";
import { project } from "./controller/project/createProjectController";

const app = new Hono();

app.route("/", auth);
app.route("/", project);

app.get("/auth", (c) => c.text("Test"));

console.log("Listening on http://localhost:5000");

serve({
  fetch: app.fetch,
  port: 5000,
});
