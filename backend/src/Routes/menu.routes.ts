import { Router } from "express";
import { verifyJWT } from "../middleware/UserInstance.middleware";
import { upload } from "../middleware/multer.middleware";
import {
  addMenu,
  deleteMenu,
  editMenu,
  getMenus,
} from "../controllers/menu.controller";

export const menuRoutes = Router();

menuRoutes.post("/add_menu", verifyJWT, upload.single("imageFile"), addMenu);

menuRoutes.put(
  "/edit_menu/:id",
  verifyJWT,
  upload.single("imageFile"),
  editMenu
);

menuRoutes.delete("/delete_menu/:id", verifyJWT, deleteMenu);

menuRoutes.get("/get_menus", verifyJWT, getMenus);
