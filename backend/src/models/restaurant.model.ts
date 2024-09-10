import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    country: {
      type: String,
      require: true,
    },
    cuisines: [
      {
        type: String,
        require: true,
      },
    ],
    deliveryTime: {
      type: Number,
      require: true,
    },
    imageUrl: {
      type: String,
      // require: true,
    },
    menus: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
