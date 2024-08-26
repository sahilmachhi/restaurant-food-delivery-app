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

    console.log(CookieData);
    const user = await User.findById(CookieData.id);

    console.log(user);

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `middleware error`,
    });
  }
};
