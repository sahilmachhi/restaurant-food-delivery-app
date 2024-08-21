import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db";
import { userRoutes } from "./Routes/user.routes";
import cookieParser from "cookie-parser";

const options = {
  httpOnly: true,
  secure: true,
};
connectDB();
const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));
// always use cookie parser for cookie oprations
app.use(cookieParser());
app.get("/", async (req: Request, res: Response) => {
  res.cookie("hello", "lol", options).json({ message: "hello from server" });
});

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
