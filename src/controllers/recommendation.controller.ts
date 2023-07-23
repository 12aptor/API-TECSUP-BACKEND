import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Recommendation } from "@prisma/client";

export const createRecommendation = async (_req: Request, res: Response) => {
  try {
    const body: Recommendation = _req.body;
    const recommendation = await prisma.recommendation.create({
      data: body,
    });
    res.status(201).json(recommendation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getRecommendations = async (_req: Request, res: Response) => {
  try {
    const recommendations = await prisma.recommendation.findMany();
    res.status(201).json(recommendations);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getRecommendation = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const recommendation = await prisma.recommendation.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!recommendation) {
      return res.status(404).json({ message: "Recommendation not found" });
    }
    res.status(201).json(recommendation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateRecommendation = async (_req: Request, res: Response) => {
  try {
    const body: Recommendation = _req.body;
    const params = _req.params;
    const recommendation = await prisma.recommendation.update({
      where: {
        id: Number(params.id),
      },
      data: body,
    });
    res.status(201).json(recommendation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteRecommendation = async (_req: Request, res: Response) => {
  try {
    const params = _req.params;
    const recommendation = await prisma.recommendation.update({
      where: {
        id: Number(params.id),
      },
      data: {
        status: false,
      },
    });
    res.status(201).json(recommendation);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
