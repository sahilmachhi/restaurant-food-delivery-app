import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { User } from "../models/user.model";

interface userRequest extends Request {
  user?: any;
}

export const verifyJWT = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: "error accessToken not found",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "secret"
    );

    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "error getting data from Cookies",
      });
    }

    const user = await User.findById(decoded.id);

    req.user = user;
    next();
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: `middleware error`,
    });
  }
};
