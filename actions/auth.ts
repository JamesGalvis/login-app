"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { SignInFormSchema, SignUpFormSchema } from "@/schemas";

export const login = async (values: z.infer<typeof SignInFormSchema>) => {
  try {
    const validatedFields = SignInFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { password, username } = validatedFields.data;

    const existingUser = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!existingUser) {
      return { error: "User does not exist" };
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return { error: "Invalid credentials!" };
    }

    return { success: "Logged in", user: existingUser };
  } catch (error) {
    return { error: "Internal Error" };
  }
};

export const register = async (values: z.infer<typeof SignUpFormSchema>) => {
  try {
    const validatedFields = SignUpFormSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { email, name, password, username } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    const existingUserByUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUserByEmail) {
      return { error: "Email already in use!" };
    }

    if (existingUserByUsername) {
      return { error: "Username already in use!" };
    }

    const newUser = await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return { success: "User created", user: newUser };
  } catch (error) {
    return { error: "Internal Error" };
  }
};
