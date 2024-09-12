import { Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { userRequest } from "./user.controller";
import mongoose from "mongoose";

export const createRestaurent = async (req: userRequest, res: Response) => {
  try {
    // const { restaurantName, city, country, cuisines, deliveryTime, imageUrl } =
    //   req.body;
    const user = req.user._id;
    const existingRestaurant: any = await Restaurant.findOne({ owner: user });
    if (existingRestaurant) {
      return res.status(409).json({
        success: false,
        message: "restaurant already exist",
      });
    }

    // restaurant image code goes here

    const restaurant = new Restaurant(req.body);
    // restaurant.imageUrl = uploadResponse.url
    restaurant.owner = new mongoose.Types.ObjectId(user);
    await restaurant.save();

    return res.status(200).json({
      success: true,
      data: restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const getOwnerRestaurant = async (req: userRequest, res: Response) => {
  try {
    const user = req.user._id;

    const restaurant = await Restaurant.find({ user: user });

    if (!restaurant) {
      return res.status(409).json({
        success: false,
        message: "this user has not created restaurant",
      });
    }

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const updateRestaurant = async (req: userRequest, res: Response) => {
  try {
    const user = req.user._id;
    const { restaurantName, city, country, cuisines, deliveryTime } = req.body;
    const restaurant = await Restaurant.findOne({ user: user });

    if (!restaurant) {
      return res.status(409).json({
        success: false,
        message: "restaurant not found",
      });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = cuisines;

    // image handling from here
    // if(file) {

    // }

    await restaurant.save();

    return res.status(200).json({
      success: true,
      message: "restaurant updated",
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
