import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      req: true,
    },
    price: {
      type: Number,
      req: true,
    },
    imageUrl: {
      type: String,
      req: true,
    },
  },
  { timestamps: true }
);

export const Menu = mongoose.model("Menu", menuSchema);
