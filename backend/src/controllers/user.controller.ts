import { Request, Response } from "express";
import { IUser, User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export interface userRequest extends Request {
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
      expiresIn: process.env.ACCESS_TOKEN_EXPIERY,
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

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({
        success: false,
        message: "Username or email and password are required.",
      });
    }
    // Find user by username or email
    const user: IUser | null = await User.findOne<IUser>({
      $or: [{ username }, { email }],
    });


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please sign up first.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateAccessRefreshToken(
      user._id as string,
      user.email,
      user.username
    );

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Respond with tokens instead of cookies
    return res.status(200).json({
      success: true,
      message: "User logged in successfully.",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const logoutUser = async (req: userRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found in request",
      });
    }

    // Invalidate refresh token
    user.refreshToken = "";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
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

export const createNewAddress = async (req: userRequest, res: Response) => {
  try {
    const user = req.user._id;

    const newAddress = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      user, // User ID to find
      { $push: { deliveryAddresses: newAddress } }, // Update operation
      { new: true, runValidators: true } // Options: return updated document, run validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({
      success: true,
      message: `address created successfully`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};

export const updateAddress = async (req: userRequest, res: Response) => {
  debugger;
  try {
    const user = req.user._id;
    const { _id: addressId } = req.body;
    const updatedAddress = req.body;

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: user,
        "deliveryAddresses._id": addressId,
      },
      {
        $set: {
          "deliveryAddresses.$": updatedAddress,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(400).json({
        success: false,
        message: `error update failed`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `address update success`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};

export const deleteAddress = async (req: userRequest, res: Response) => {
  try {
    const addressId = req.params.addressId;
    if (!addressId) {
      return res.status(404).json({ message: "address id not found" });
    }
    const user = req.user._id;

    const updatedUser = await User.findOneAndUpdate(
      { _id: user },
      { $pull: { deliveryAddresses: { _id: addressId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User or address not found in database" });
    }

    return res.status(200).json({
      success: true,
      message: `address deleted from database`,
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};

export const getAddress = (req: userRequest, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `could't find user in database`,
      });
    }
    const userAddress = user.deliveryAddresses;

    if (!userAddress) {
      return res.status(401).json({
        success: false,
        message: `could't find user address`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `user address fetched successfuly`,
      userAddress: userAddress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};

export const updateUser = async (req: userRequest, res: Response) => {
  try {
    const user = req.user;
    const { username, fullname } = req.body;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `could't find user in database`,
      });
    }
    user.fullname = fullname;
    user.username = username;

    await user.save();

    return res.status(200).json({
      success: true,
      message: `user address fetched successfuly`,
      updatedUser: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};
