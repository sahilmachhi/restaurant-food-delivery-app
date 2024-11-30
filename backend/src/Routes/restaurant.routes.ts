import { Router } from "express";
import {
  createRestaurent,
  deleteRestaurant,
  getOwnerRestaurant,
  getRestaurantOrder,
  getRestaurants,
  getSingleRestaurant,
  searchRestaurant,
  updateRestaurant,
  updateRestaurantOrder,
} from "../controllers/restaurant.controller";
import { verifyJWT } from "../middleware/UserInstance.middleware";
import { upload } from "../middleware/multer.middleware";

export const restaurantRoutes = Router();

// restaurant routes

restaurantRoutes.get("/get_owner_restaurant", verifyJWT, getOwnerRestaurant);

restaurantRoutes.post(
  "/create_restaurant",
  verifyJWT,
  upload.single("imageFile"),
  createRestaurent
);

restaurantRoutes.put(
  "/update_restaurant/:restaurantId",
  verifyJWT,
  upload.single("imageFile"),
  updateRestaurant
);

restaurantRoutes.delete("/delete_restaurant/:id", verifyJWT, deleteRestaurant);

// restaurant orders routes

restaurantRoutes.get("/get_orders", verifyJWT, getRestaurantOrder);

restaurantRoutes.put("/update_order", verifyJWT, updateRestaurantOrder);

// public route

restaurantRoutes.get(
  "/search_restaurants/:search_text/:search_query",
  searchRestaurant
);

restaurantRoutes.get("/get_all_restaurants", getRestaurants);

restaurantRoutes.get("/view_restaurant/:id", getSingleRestaurant);
