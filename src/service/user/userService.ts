import bcrypt from "bcryptjs";
import { sign } from "hono/jwt";
import { newUser, findUser } from "../../repository/user/userRepository";

export async function signUp(email: string, password: string, name: string) {
  const existUser = await findUser(email);

  const hashPass = await bcrypt.hash(password, 10);

  const user = await newUser({
    email,
    name,
    password: hashPass,
  });

  const token = await sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_KEY!
  );

  return { message: "Account Created", token };
}

export async function signIn(email: string, password: string) {
  const user = await findUser(email);
  if (!user) {
    throw new Error("Invalid Email");
  }

  const userPassword = await bcrypt.compare(password, user.password);
  if (!userPassword) {
    throw new Error("Incorrect Password");
  }

  const token = await sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_KEY!
  );

  return { message: "Login Success", token };
}
