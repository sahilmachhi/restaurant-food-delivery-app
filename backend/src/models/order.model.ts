import mongoose, { model, Schema } from "mongoose";
import { addressSchema } from "./user.model";
import { CartItemSchema } from "./cart.model";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: addressSchema,
    cartItems: [CartItemSchema],
    totalAmount: Number,
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "outForDelivery",
        "delivered",
      ],
    },
  },
  { timestamps: true }
);

const NewOrderSchema = new Schema({
  status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "outForDelivery", "delivered"],
  },
});

export const Order = model("Orders", orderSchema);
