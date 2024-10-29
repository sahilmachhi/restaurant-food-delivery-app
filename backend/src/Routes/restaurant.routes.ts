import { Router } from "express";
import {
  createRestaurent,
  getOwnerRestaurant,
  updateRestaurant,
} from "../controllers/restaurant.controller";
import { verifyJWT } from "../middleware/UserInstance.middleware";
import { upload } from "../middleware/multer.middleware";

export const restaurantRoutes = Router();

// restaurantRoutes.get("/getRes", getRestaurant);

restaurantRoutes.post(
  "/create_restaurant",
  verifyJWT,
  upload.single("imageFile"),
  createRestaurent
);

restaurantRoutes.get("/getOwnerRestaurant", verifyJWT, getOwnerRestaurant);

restaurantRoutes.put("/updateRestaurant", verifyJWT, updateRestaurant);
