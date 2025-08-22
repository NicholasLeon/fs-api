import { Hono } from "hono";
import { serve } from "bun";

const app = new Hono();

app.get("/", (c) => c.text("Flowsync API"));

console.log("Listening on http://localhost:5000");

console.log("Server Start");

serve({
  fetch: app.fetch,
  port: 5000,
});
