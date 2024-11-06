import { Response } from "express";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import { uploadImage } from "../middleware/Cloudinary.middleware";

export const addMenu = async (req: any, res: Response) => {
  try {
    const { name, price, description } = req.body;
    const userId = req.user._id;
    const restaurantId = req.params.restuarantId;
    const file = req.file;

    if (!(name && price && description)) {
      return res.status(401).json({
        success: false,
        message: "please fill all data",
      });
    }

    if (!file) {
      return res.status(402).json({
        success: false,
        message: "please provide image file",
      });
    }

    const imageUrl = await uploadImage(file);

    if (!imageUrl) {
      return res.status(402).json({
        success: false,
        message: "can't get cloudinary URL of image",
      });
    }

    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({
      owner: userId,
      _id: restaurantId,
    });

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "can't find its restaurant",
      });
    }

    restaurant.menus.push(menu._id);
    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "menu added successfully",
      menu,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const editMenu = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;

    if (price == !Number) {
      return res.status(401).json({
        success: false,
        message: "please enter valid numbers in price",
      });
    }

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(401).json({
        success: false,
        message: "cannot find menu",
      });
    }

    console.log(menu);

    menu.name = name;
    menu.description = description;
    menu.price = price;
    if (file) {
      const imageUrl = await uploadImage(file);
      menu.imageUrl = imageUrl;
    }

    console.log(menu);

    await menu.save();

    return res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const deleteMenu = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { restaurantId, menuId } = req.params;

    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: userId,
    });

    if (!restaurant) {
      return res.status(409).json({
        success: false,
        message: "restaurant not found",
      });
    }

    const updatedMenuId = await Restaurant.updateOne(
      { _id: restaurantId },
      { $pull: { menus: menuId } }
    );

    if (updatedMenuId.modifiedCount === 0) {
      return res.status(500).json({
        success: false,
        message: "Failed to remove the menu item. Please try again.",
      });
    }

    const deletedItem = await Menu.findByIdAndDelete(menuId);

    if (!deletedItem) {
      return res.status(401).json({
        success: false,
        message: "item delete failed because item not found",
      });
    }

    return res.status(200).json({
      success: true,
      deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const getMenus = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { restaurantId } = req.params;

    console.log(restaurantId);

    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: userId,
    }).populate("menus");

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const menus = restaurant.menus;

    return res.status(200).json({
      success: true,
      menus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
