// import axios from "axios";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const loginData = await request.json();

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`,
    loginData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = response.data;
  const accessToken = response.data.accessToken;

  console.log(accessToken);

  const res = NextResponse.json({
    data,
  });
  res.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    sameSite: "none", // Required for cross-origin requests
    path: "/", // Cookie is available across the app
    maxAge: 3 * 24 * 60 * 60, // 3 days in seconds
  });

  return res;
}
