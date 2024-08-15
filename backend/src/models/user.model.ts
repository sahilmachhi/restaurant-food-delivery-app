import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    lowercase: true,
  },
  avatar: {
    type: String,
  },
  username: {
    type: String,
    require: true,
    lowercase: true,
    index: true,
  },
  password: {
    type: String,
    require: true,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
    },
  ],
  isSeller: {
    type: Boolean,
    default: false,
  },
  restaurantOwner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  refreshToken: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
