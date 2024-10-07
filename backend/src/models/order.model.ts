import mongoose, { model, Schema } from "mongoose";

const DeliverySchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
});

const CartSchema = new Schema({
  menuId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, require: true },
});

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    deliveryDetails: DeliverySchema,
    cartItems: [CartSchema],
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

export const Order = model("Orders", orderSchema);
