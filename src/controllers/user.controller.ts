import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import { User } from "@prisma/client";

export const createUser = async (_req: Request, res: Response) => {
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

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(201).json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getUser = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateUser = async (_req: Request, res: Response) => {
  try {
    const body: User = _req.body;
    const params = _req.params;
    const user = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
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

export const deleteUser = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const user = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        status: false,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
