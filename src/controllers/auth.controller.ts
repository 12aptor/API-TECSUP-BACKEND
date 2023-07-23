import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { User } from "@prisma/client";
import * as jose from "jose";

export const signupUser = async (_req: Request, res: Response) => {
  try {
    const body: User = _req.body;
    const userExists = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = await prisma.user.create({
      data: {
        ...body,
        password: await bcrypt.hash(body.password, 10),
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const signinUser = async (_req: Request, res: Response) => {
  try {
    const { email, password } = _req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const secret = new TextEncoder().encode(process.env.SECRET_JWT || "");

    const jwt = await new jose.SignJWT({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);

    res.status(200).json({ accessToken: jwt });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
