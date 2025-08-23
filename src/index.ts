import { Hono } from "hono";
import { serve } from "bun";
import { auth } from "./user/userController";

const app = new Hono();

app.route("/", auth);

app.get("/auth", (c) => c.text("Test"));

console.log("Listening on http://localhost:5000");

serve({
  fetch: app.fetch,
  port: 5000,
});
