import { Router } from "express";
import { verifyJWT } from "../middleware/UserInstance.middleware";
import {
  createOrder,
  getOrdersByRestaurant,
  getOrdersByUser,
} from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.post("/createOrder", verifyJWT, createOrder);

orderRoutes.get("/get_user_order", verifyJWT, getOrdersByUser);

// restaurant admin route
orderRoutes.get(
  "/get_restaurant_order/:restaurantId",
  verifyJWT,
  getOrdersByRestaurant
);
