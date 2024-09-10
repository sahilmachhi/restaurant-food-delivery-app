import { Router } from "express";
import { createRestaurent } from "../controllers/restaurant.controller";
import { verifyJWT } from "../middleware/UserInstance.middleware";

export const restaurantRoutes = Router();

// restaurantRoutes.get("/getRes", getRestaurant);

restaurantRoutes.post("/createRestaurent", verifyJWT, createRestaurent);
