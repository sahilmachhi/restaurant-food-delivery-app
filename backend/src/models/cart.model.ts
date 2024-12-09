import mongoose, { Schema, Types } from "mongoose";
import { Restaurant } from "./restaurant.model";

interface CartItem {
  productId: Types.ObjectId;
  restaurantId: Types.ObjectId;
  quantity: number;
}

interface ICart extends Document {
  userId: Types.ObjectId;
  items: CartItem[];
}

export const CartItemSchema = new Schema<CartItem>({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [CartItemSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model<ICart>("cart", cartSchema);
export type { ICart };
