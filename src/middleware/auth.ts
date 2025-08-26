import { verify } from "hono/jwt";
import type { MiddlewareHandler } from "hono";

export const getToken: MiddlewareHandler = async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header) return c.json({ error: "Missing Auth Handler" }, 401);

  const token = header.replace("Bearer ", "").trim();
  try {
    const payload = await verify(token, process.env.JWT_KEY!);
    c.set("jwtPayload", payload);
    await next();
  } catch {
    return c.json({ error: "Invalid Expired Token" }, 401);
  }
};
