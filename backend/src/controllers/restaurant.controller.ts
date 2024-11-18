import { Response, Request } from "express";
import { Restaurant } from "../models/restaurant.model";
import { userRequest } from "./user.controller";
import mongoose from "mongoose";
import { Order } from "../models/order.model";
import { uploadImage } from "../middleware/Cloudinary.middleware";
import { Menu } from "../models/menu.model";

export const createRestaurent = async (req: userRequest, res: Response) => {
  try {
    // const { restaurantName, city, country, cuisines, deliveryTime, imageUrl } =
    //   req.body;
    const user = req.user._id;
    // const existingRestaurant: any = await Restaurant.findOne({ owner: user });
    const file = req.file;

    // if (existingRestaurant) {
    //   return res.status(409).json({
    //     success: false,
    //     message: "restaurant already exist",
    //   });
    // }

    // restaurant image code goes here
    if (!file) {
      return res.status(409).json({
        success: false,
        message: "please upload Restuarant Image",
      });
    }
    const restaurant = new Restaurant(req.body);

    const imageUrl = await uploadImage(file);
    restaurant.imageUrl = imageUrl;

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

    const restaurant = await Restaurant.find({ owner: user });

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
    const { restaurantId } = req.params;
    const file = req.file;
    const { restaurantName, city, country, cuisines, deliveryTime } = req.body;

    const restaurant = await Restaurant.findOne({
      _id: restaurantId,
      owner: user,
    });

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
    if (file) {
      const imageUrl = await uploadImage(file);
      restaurant.imageUrl = imageUrl;
    }

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

export const deleteRestaurant = async (req: any, res: Response) => {
  try {
    const restaurantId = req.params.id;

    // Find the restaurant by ID and delete it

    const restaurant = await Restaurant.findOne({ _id: restaurantId });
    const arrayOfMenuId = restaurant?.menus;

    arrayOfMenuId?.forEach(async (menuId) => {
      const deletedMenu = await Menu.deleteOne({ _id: menuId.toString() });

      if (!deletedMenu) {
        return res.status(500).json({
          success: false,
          message: `menu delete failed of id:${menuId.toString()}`,
        });
      }
    });

    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res
        .status(404)
        .json({ message: "Restaurant not found", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
      // data: deletedRestaurant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRestaurantOrder = async (req: userRequest, res: Response) => {
  try {
    const user = req.user._id;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user is not logged in",
      });
    }
    const restaurant = await Restaurant.findOne({ owner: user });

    if (!restaurant) {
      return res.status(402).json({
        success: false,
        message: "user has not created restaurant",
      });
    }

    const Orders = await Order.find({ restaurant: restaurant._id });

    if (!Orders) {
      return res.status(402).json({
        success: false,
        message: "no orders on this restaurant",
      });
    }

    return res.status(200).json({
      success: true,
      Orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const updateRestaurantOrder = async (req: any, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOne(orderId);

    if (!order) {
      return res.status(401).json({
        success: false,
        message: "order does not exist",
      });
    }

    order.status = status;

    await order.save();
    return res.status(200).json({
      success: true,
      message: "order status updated successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const searchRestaurant = async (req: any, res: Response) => {
  try {
    const searchText: string = req.params.search_text || "";
    const searchQuery: string = req.params.search_query || "";
    console.log(`searchtext: ${searchText}`);
    console.log(`searchQuery: ${searchQuery}`);
    // this code should be reviewed
    const selectedCuisines = ((req.query.selected_cuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const Query: any = {};

    if (searchText) {
      Query.$or = [
        {
          restaurantName: { $regex: searchText, $options: "i" },
          city: { $regix: searchText, $options: "i" },
          country: { $regix: searchText, $options: "i" },
        },
      ];
    }

    if (searchQuery) {
      Query.$or = [
        {
          restaurantName: { $regex: searchText, $options: "i" },
          cuisines: { $regix: searchQuery, $options: "i" },
        },
      ];
    }

    if (selectedCuisines.length > 0) {
      Query.cuisines = { $in: selectedCuisines };
    }

    const restuarants = await Restaurant.find(Query);

    if (!restuarants) {
      return res.status(401).json({
        success: false,
        message: "no restaurant found with this filter",
      });
    }

    return res.status(200).json({
      success: true,
      restuarants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const restuarants = await Restaurant.find();

    if (!restuarants) {
      return res.status(500).json({
        success: false,
        message: "no restaurant available",
      });
    }

    return res.status(200).json({
      success: true,
      restuarants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
export const getSingleRestaurant = async (req: any, res: Response) => {
  try {
    const restaurantId = req.params.id;

    const restaurant = await Restaurant.findById(restaurantId).populate(
      "menus"
    );

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "restaurant not found",
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
