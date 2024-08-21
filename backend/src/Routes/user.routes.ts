import { Router } from "express";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller";
import { verifyJWT } from "../../middleware/UserInstance.middleware";

export const userRoutes = Router();

userRoutes.post("/signup", createUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logout", verifyJWT, logoutUser);

userRoutes.post("/getUser", verifyJWT, getUser);
