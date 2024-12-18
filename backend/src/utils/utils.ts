const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 15);

export const CookiesOptions = {
  //   sameSite: process.env.SAMESITE || "none",
  //   httpOnly: true,
  httpOnly: process.env.HTTPSONLY === "true",
  //   secure: true,
  secure: process.env.SECURE === "true",
  expires: expiryDate,
};
