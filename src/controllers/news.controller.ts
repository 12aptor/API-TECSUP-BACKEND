import { Request, Response } from "express";
import { prisma } from "../prisma";
import { News } from "@prisma/client";

export const createNew = async (_req: Request, res: Response) => {
  try {
    const body: News = _req.body;
    const _new = await prisma.news.create({
      data: body,
    });
    res.status(201).json(_new);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getNews = async (_req: Request, res: Response) => {
  try {
    const news = await prisma.news.findMany();
    res.status(201).json(news);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getNew = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const _new = await prisma.news.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!_new) {
      return res.status(404).json({ message: "New not found" });
    }
    res.status(201).json(_new);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateNew = async (_req: Request, res: Response) => {
  try {
    const body: News = _req.body;
    const params = _req.params;
    const _new = await prisma.news.update({
      where: {
        id: Number(params.id),
      },
      data: body,
    });
    res.status(201).json(_new);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteNew = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const _new = await prisma.news.update({
      where: {
        id: Number(params.id),
      },
      data: {
        status: false,
      },
    });
    res.status(201).json(_new);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
