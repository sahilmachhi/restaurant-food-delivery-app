import { Request, Response } from "express";

export const getRes = async (req: Request, res: Response) => {
  res.json({ message: "hello from restuarant route" });
};
