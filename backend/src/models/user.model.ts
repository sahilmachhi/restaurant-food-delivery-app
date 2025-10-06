import mongoose, { Document, Schema } from "mongoose";

// 1️⃣ Address Interface
export interface IAddress {
  name: string;
  address: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: number;
  };
}

// 2️⃣ User Interface (Extends Mongoose Document)
export interface IUser extends Document {
  fullname: string;
  email: string;
  avatar?: string;
  username: string;
  password: string;
  cart: mongoose.Types.ObjectId[];
  isSeller: boolean;
  restaurantOwner: mongoose.Types.ObjectId[];
  refreshToken?: string;
  deliveryAddresses: IAddress[];
}

// 3️⃣ Address Schema
export const addressSchema = new Schema<IAddress>({
  name: {
    type: String,
    default: "address1",
  },
  address: {
    name: { type: String, required: true, default: "" },
    addressLine1: { type: String, required: true, default: "" },
    addressLine2: { type: String, default: "" },
    city: { type: String, required: true, default: "" },
    district: { type: String, required: true, default: "" },
    state: { type: String, required: true, default: "" },
    country: { type: String, required: true, default: "" },
    pincode: { type: Number, required: true, default: 111111 },
  },
});

// 4️⃣ User Schema
const userSchema = new Schema<IUser>({
  fullname: { type: String, required: false },
  email: { type: String, required: true, lowercase: true },
  avatar: { type: String },
  username: { type: String, required: true, lowercase: true, index: true },
  password: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
  isSeller: { type: Boolean, default: false },
  restaurantOwner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }],
  refreshToken: { type: String },
  deliveryAddresses: [addressSchema],
});

// 5️⃣ Model Export
export const User = mongoose.model<IUser>("User", userSchema);
