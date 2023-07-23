import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Bootcamp } from "@prisma/client";

export const createBootcamp = async (_req: Request, res: Response) => {
  try {
    const body: Bootcamp = _req.body;
    const bootcamp = await prisma.bootcamp.create({
      data: body,
    });
    res.status(201).json(bootcamp);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getBootcamps = async (_req: Request, res: Response) => {
  try {
    const bootcamps = await prisma.bootcamp.findMany();
    res.status(200).json(bootcamps);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getBootcamp = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const bootcamp = await prisma.bootcamp.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp not found" });
    }
    res.status(200).json(bootcamp);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateBootcamp = async (_req: Request, res: Response) => {
  try {
    const body: Bootcamp = _req.body;
    const params = _req.params;
    const bootcamp = await prisma.bootcamp.update({
      where: {
        id: Number(params.id),
      },
      data: body,
    });
    res.status(201).json(bootcamp);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteBootcamp = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const bootcamp = await prisma.bootcamp.update({
      where: {
        id: Number(params.id),
      },
      data: {
        status: false,
      },
    });
    res.status(201).json(bootcamp);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
