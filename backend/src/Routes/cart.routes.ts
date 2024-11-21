import { Router } from "express";
import { verifyJWT } from "../middleware/UserInstance.middleware";
import {
  addCart,
  decrementQty,
  deleteCart,
  incrementQty,
  removeCart,
  viewCart,
} from "../controllers/cart.controller";

export const cartRoutes = Router();

cartRoutes.get("/add_cart/:id", verifyJWT, addCart);
cartRoutes.get("/remove_cart/:id", verifyJWT, removeCart);
cartRoutes.get("/add_qty/:id", verifyJWT, incrementQty);
cartRoutes.get("/remove_qty/:id", verifyJWT, decrementQty);
cartRoutes.get("/view_cart", verifyJWT, viewCart);
cartRoutes.get("/clear_cart", verifyJWT, deleteCart);
