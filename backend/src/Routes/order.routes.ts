import { Router } from "express";
import { verifyJWT } from "../middleware/UserInstance.middleware";
import { createOrder, getOrders } from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.get("/get_user_order", verifyJWT, getOrders);

orderRoutes.post("/createOrder", verifyJWT, createOrder);
