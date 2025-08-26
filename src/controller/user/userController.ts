import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { signUp, signIn } from "../../service/user/userService";

export const auth = new Hono();

const signUpValidation = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

auth.post("/signup", zValidator("json", signUpValidation), async (c) => {
  const body = await c.req.json();

  try {
    const { email, password, name } = body;
    const user = await signUp(email, password, name);
    return c.json({ message: "AcountCreated", user }, 201);
  } catch (error) {
    return c.json({ message: "Email Already Registered" }, 409);
  }
});

auth.post("/signin", async (c) => {
  const { email, password } = await c.req.json();

  try {
    const user = await signIn(email, password);
    return c.json(user);
  } catch (error) {
    return c.json({ message: "Invalid email or password" }, 401);
  }
});
