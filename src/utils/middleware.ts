import { NextFunction, Request, Response } from "express";
// import * as jose from "jose";

export const isAuthorized = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  // const authorization = _req.headers.authorization;
  // const jwt = authorization?.split(" ")[1];
  // if (!jwt) {
  //   return res.status(400).json({ message: "Unauthorized" });
  // }

  // const secret = new TextEncoder().encode(process.env.SECRET_JWT || "");
  // const isTokenValid = jose.jwtVerify(jwt, secret);
  // if (!isTokenValid) {
  //   return res.status(400).json({ message: "Unauthorized" });
  // }
  return next();
};
