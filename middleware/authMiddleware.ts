import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import Profile from "../models/Profile";

interface CustomRequest extends Request {
  userId?: string;
  user?: {
    isAdmin: boolean;
  } | null;
}

export const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token;

  try {
    if (!req.headers.authorization) {
      return res.status(401).send("Unauthorized");
    }

    token = req.headers.authorization;

    const { userId }: any = jwt.verify(token, process.env.JWT_SECRET!);

    req.userId = userId;
    req.user = await Profile.findById(userId).select("-password");

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).send("Unauthorized");
  }
};

export const adminMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};
