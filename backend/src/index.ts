import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./db";
import { userRoutes } from "./Routes/user.routes";

connectDB();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "hello" });
});

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("app is running on port 5000");
});
