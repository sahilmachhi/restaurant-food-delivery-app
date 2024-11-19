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
    debugger;
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "error accessToken not found",
      });
    }

    const CookieData: any = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "secret"
    );

    if (!CookieData) {
      return res.status(400).json({
        success: false,
        message: "error getting data from Cookies",
      });
    }

    const user = await User.findById(CookieData.id);

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
