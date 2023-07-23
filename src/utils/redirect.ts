import { Request, Response } from "express"

export const redirect = (_req: Request, res: Response) => res.redirect("/api-docs")