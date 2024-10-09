import { Response } from "express";
import { Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import { userRequest } from "./user.controller";
import mongoose from "mongoose";

export const addMenu = async (req: userRequest, res: Response) => {
  try {
    const { name, price, description } = req.body;
    const userId = req.user._id;

    //     file handling code will be written here

    const menu = await Menu.create({
      name,
      description,
      price,
      // image: imageURL
    });

    const restaurant = await Restaurant.findOne({ owner: userId });

    if (restaurant) {
      // there is some bug so written different code
      restaurant.menus.push(menu._id);
      await restaurant.save();
    }

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

export const editMenu = async (req: userRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    //     file handling code will be written here

    const menu = await Menu.findById(id);
    if (!menu) {
      return res.status(401).json({
        success: false,
        message: "cannot find menu",
      });
    }

    if (menu) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

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
