import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "address1",
  },
  address: {
    name: {
      type: String,
      require: true,
      default: "",
    },
    addressLine1: {
      type: String,
      require: true,
      default: "",
    },
    addressLine2: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      required: true,
      default: "",
    },
    district: {
      type: String,
      require: true,
      default: "",
    },
    state: {
      type: String,
      require: true,
      default: "",
    },
    country: {
      type: String,
      require: true,
      default: "",
    },
    pincode: {
      type: Number,
      require: true,
      default: 111111,
    },
  },
});

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
  deliveryAddresses: [addressSchema],
});

export const User = mongoose.model("User", userSchema);
