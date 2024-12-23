import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db";
import { userRoutes } from "./Routes/user.routes";
import cookieParser from "cookie-parser";
import { restaurantRoutes } from "./Routes/restaurant.routes";
import { menuRoutes } from "./Routes/menu.routes";
import { orderRoutes } from "./Routes/order.routes";
import { cartRoutes } from "./Routes/cart.routes";
import { CookiesOptions } from "./utils/utils";

// const options = {
//   httpOnly: false,
//   secure: false,
// };

connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URI || "http://localhost:3000", // Allow only this origin
    credentials: true,
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URI || "http://localhost:3000"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// always use cookie parser for cookie oprations
app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
  res
    .cookie("hello", "lol", CookiesOptions)
    .json({ message: "hello from restaurant server" });
});

app.use("/api/user", userRoutes);
app.use("/api/restaurant", restaurantRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
