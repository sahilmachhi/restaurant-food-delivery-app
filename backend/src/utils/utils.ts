import { CookieOptions } from "express";
const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 15);

export const CookiesOptions: CookieOptions = {
  sameSite: "none",
  //   httpOnly: true,
  httpOnly: process.env.HTTPSONLY === "true" || false,
  //   secure: true,
  secure: process.env.SECURE === "true" || true,
  expires: expiryDate,
  // domain: process.env.COOKIE_DOMAIN || "*",
  path: "/",
};
