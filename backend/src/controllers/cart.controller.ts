import { Response } from "express";
import { Cart, ICart } from "../models/cart.model";
import mongoose from "mongoose";

export const addCart = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const quantity = 1;
    let cart: ICart | null = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!cart) {
      cart = new Cart({ userId: new mongoose.Types.ObjectId(userId) });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Item exists, update its quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item does not exist, push new item to the array
      cart.items.push({ productId, quantity });
    }

    await (cart as any).save();

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const removeCart = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!cart) {
      return res.status(401).json({
        success: false,
        message: "user has not created any cart",
      });
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { _id: productId } } },
      { new: true }
    );

    // Step 3: Check if the product was actually removed
    if (updatedCart && updatedCart.items.length === cart.items.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const incrementQty = async (req: any, res: Response) => {
  try {
    console.log("incrementQty fn running");
    const userId = req.user._id;
    const productId = req.params.id;

    // const item = await Cart.findOne({
    //   userId: new mongoose.Types.ObjectId(userId),
    // }).populate({ path: "items.productId", model: "Menu" });

    // if (!cart) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "no cart found",
    //   });
    // }

    const updatedCart = await Cart.updateOne(
      {
        userId: new mongoose.Types.ObjectId(userId),
        "items._id": new mongoose.Types.ObjectId(productId), // Match the specific item
      },
      {
        $inc: { "items.$.quantity": 1 }, // Increment the quantity of the matched item
      }
    );

    if (updatedCart.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item quantity incremented successfully",
      data: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const decrementQty = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const updatedCart = await Cart.updateOne(
      {
        userId: new mongoose.Types.ObjectId(userId),
        "items._id": new mongoose.Types.ObjectId(productId),
        "items.quantity": { $gt: 1 }, // Match the specific item
      },
      {
        $inc: { "items.$.quantity": -1 }, // decrement the quantity of the matched item
      }
    );

    if (updatedCart.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Item not found in the cart",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item quantity decremented successfully",
      data: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const viewCart = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).populate({ path: "items.productId", model: "Menu" });

    if (!cart) {
      return res.status(401).json({
        success: false,
        message: "no cart found",
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error?.message,
    });
  }
};

export const deleteCart = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;

    const updatedCart = await Cart.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { $set: { items: [] } },
      { new: true } // Return the updated document
    );

    if (!updatedCart) {
      return res.status(401).json({
        success: false,
        message: "cart remove failed",
      });
    }

    return res.status(200).json({
      success: true,
      updatedCart,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "server error",
      error: error?.message,
    });
  }
};
