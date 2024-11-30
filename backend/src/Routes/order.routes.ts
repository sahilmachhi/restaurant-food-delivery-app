import { Router } from "express";
import { verifyJWT } from "../middleware/UserInstance.middleware";
import { getOrders } from "../controllers/order.controller";

export const orderRoutes = Router();

orderRoutes.get("/get_user_order", verifyJWT, getOrders);
