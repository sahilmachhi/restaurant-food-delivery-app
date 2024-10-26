import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

export async function middleware(request: NextRequest) {
  console.log("middlware running");
  const cookieStore: any = await cookies();
  const accessToken = cookieStore.get("accessToken");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getUser`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken.value}`,
        },
      }
    );
    console.log("user is found from middlware", response.data);
  } catch (error) {
    console.log(error);
  }
  return console.log(accessToken);
  // return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
