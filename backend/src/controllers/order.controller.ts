import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { userRequest } from "./user.controller";
import { Order } from "../models/order.model";
import { Cart } from "../models/cart.model";

export const getOrders = async (req: userRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const orders = Order.find({ user: userId })
      .populate("user")
      .populate("restuarant");

    if (!orders) {
      return res.status(401).json({
        success: false,
        message: "no orders found",
      });
    }

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const createCheckoutSession = async (
  req: userRequest,
  res: Response
) => {
  try {
    const userId = req.user._id;
    const checkoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );
    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "restaurant not found",
      });
    }

    const order = new Order({
      restaurant: restaurant._id,
      user: userId,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
    });

    //     line items

    const menuItems = restaurant.menus;
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);

    // stripe logic start from here
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

const createLineItems = (checkoutSessionRequest: any, menuItems: any) => {
  // create lineItems
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem: any) => {
    const menuItem = menuItems.find(
      (item: any) => item._id === cartItem.menuId
    );
    if (!menuItem) throw new Error("menu item id not found");

    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: menuItem.name,
          images: [menuItem.images],
        },
        unit_amount: menuItem.price,
      },
      quantity: cartItem.quantity,
    };
  });
  // return lineItmes
  return lineItems;
};

export const createOrder = async (req: any, res: Response) => {
  try {
    const user = req.user._id;
    const { address, cartItems, totalAmount } = req.body;

    if (!address || !cartItems || !totalAmount) {
      return res.status(404).json({
        success: false,
        message: "Required fields missing: address, cartItems, or totalAmount",
      });
    }

    const cart = await Cart.findOne({ userId: user }).populate(
      "items.productId items.restaurantId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty or not found",
      });
    }

    // Verify that all cart items belong to the same restaurant
    const uniqueRestaurantIds = new Set(
      cart.items.map((item) => item.restaurantId.toString())
    );
    if (uniqueRestaurantIds.size > 1) {
      return res.status(400).json({
        success: false,
        message: "All items in the cart must belong to the same restaurant.",
      });
    }

    const newOrder = new Order({
      user,
      address,
      cartItems: cart.items, // Save the items from the cart
      totalAmount,
      status: "pending",
    });
    const savedOrder = await newOrder.save();

    if (!savedOrder) {
      return res.status(401).json({
        success: false,
        message: "order failed",
      });
    }

    // Clear the user's cart after creating the order
    // await Cart.findOneAndUpdate({ userId: user }, { items: [] });

    return res.status(200).json({
      success: false,
      savedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
