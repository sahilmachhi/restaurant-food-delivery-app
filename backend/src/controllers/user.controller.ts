import { Request, Response } from "express";
import { User } from "../models/user.model";

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

    const newUser = await User.create({ email, username, password, fullname });

    return res.status(200).json({ success: true, message: newUser });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: `error creating a new user in database here's error: ${error}`,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const logindata = req.body;
  return res.status(200).json(logindata);
};
