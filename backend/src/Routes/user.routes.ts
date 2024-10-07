import { Router } from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  createNewAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  updateUser,
  getUser,
} from "../controllers/user.controller";
import { verifyJWT } from "../middleware/UserInstance.middleware";

export const userRoutes = Router();

userRoutes.post("/signup", createUser);

userRoutes.post("/login", loginUser);

// secured routes

userRoutes.post("/logout", verifyJWT, logoutUser);

userRoutes.post("/getUser", verifyJWT, getUser);

userRoutes.post("/createAddress", verifyJWT, createNewAddress);

userRoutes.put("/updateAddress", verifyJWT, updateAddress);

userRoutes.delete("/deleteAddress/:addressId", verifyJWT, deleteAddress);

userRoutes.get("/getAddress", verifyJWT, getAddress);

userRoutes.put("/updateUser", verifyJWT, updateUser);
