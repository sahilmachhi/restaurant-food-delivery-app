import { Request, Response } from "express";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Document } from "mongoose";

interface userRequest extends Request {
  user?: any;
}

const generateAccessRefreshToken = (
  id: string,
  email: string,
  username: string
): any => {
  const secret: string = process.env.ACCESS_TOKEN_SECRET || "secret";

  const accessToken = jwt.sign(
    {
      id,
      email,
      username,
    },
    secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIERY,
    }
  );

  const refreshToken = jwt.sign(
    {
      id,
    },
    secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIERY,
    }
  );

  return { accessToken, refreshToken };
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, fullname } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(404).json({
        success: false,
        message: `error user ${existingUser.username} aleady exist`,
      });
    }

    const saltRounds = 10;
    const hasedPassword = await bcrypt.hash(password, saltRounds);
    if (!hasedPassword) {
      return res.status(404).json({
        success: false,
        message: `password hash failed`,
      });
    }

    console.log(hasedPassword);

    const newUser = await User.create({
      email,
      username,
      password: hasedPassword,
      fullname,
    });

    return res.status(200).json({ success: true, message: newUser });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `error creating a new user in database here's error: ${error}`,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!(username || email)) {
      return res.status(401).json({
        success: false,
        message: `username is already exist`,
      });
    }

    interface userObj extends Document {
      password: string;
      _id: string;
      email: string;
      username: string;
      refreshToken: string;
    }

    const user: userObj | null = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(402).json({
        success: false,
        message: `user has not created account`,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: `invalid password`,
      });
    }

    const { accessToken, refreshToken } = generateAccessRefreshToken(
      user._id,
      user.email,
      user.username
    );

    user.refreshToken = refreshToken;

    await user.save();

    const options = {
      httpOnly: true,
      secure: true,
    };
    console.log(accessToken);
    console.log(refreshToken);
    return res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json({
        success: true,
        message: `user logged in successfully`,
        data: user,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};

export const logoutUser = async (req: userRequest, res: Response) => {
  try {
    const user = req.user;

    const refreshToken: string = "";
    user.refreshToken = refreshToken;

    console.log("updated user" + user);
    try {
      await user.save();
    } catch (error) {
      return res.status(405).json({
        message: error,
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .status(200)
      .json({
        success: true,
        message: "user logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};

export const getUser = async (req: userRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `user not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};
