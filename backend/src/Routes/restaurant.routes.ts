import { Router } from "express";
import {
  createRestaurent,
  getOwnerRestaurant,
  updateRestaurant,
} from "../controllers/restaurant.controller";
import { verifyJWT } from "../middleware/UserInstance.middleware";

export const restaurantRoutes = Router();

// restaurantRoutes.get("/getRes", getRestaurant);

restaurantRoutes.post("/createRestaurent", verifyJWT, createRestaurent);

restaurantRoutes.get("/getOwnerRestaurant", verifyJWT, getOwnerRestaurant);

restaurantRoutes.put("/updateRestaurant", verifyJWT, updateRestaurant);
