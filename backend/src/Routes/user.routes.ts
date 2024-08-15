import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller";

export const userRoutes = Router();

userRoutes.post("/signup", createUser);

userRoutes.post("/login", loginUser);
