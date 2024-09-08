import { Router } from "express";
import { getRes } from "../controllers/restaurant.controller";

export const restaurantRoutes = Router();

restaurantRoutes.get("/getRes", getRes);
