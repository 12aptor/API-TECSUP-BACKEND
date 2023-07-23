import { NextFunction, Request, Response } from "express";

export const userRole = (_req: Request, res: Response, next: NextFunction) => {
  const jwt = _req.headers.authorization;
  if (!jwt) {
    return res.status(400).json({ message: "Unauthorized" });
  }
  return next();
};
