"use client";
import { PostRequest } from "@/utils/tanstackApiHandler";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileSidebar from "./MobileSidebar";
import ProfileDropDown from "./ProfileDropDown";

const LoginButton = () => {
  const getUserUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getUser`;
  const LogoutUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`;

  const {
    mutate: getUser,
    isPending,
    isError,
    isSuccess,
  } = PostRequest(getUserUrl, ["user"]);

  const { mutate: logout } = PostRequest(LogoutUrl, ["user"]);
  const LogoutHandler = () => {
    logout();
    getUser();
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      {isPending ? (
        <>
          <h1>loading</h1>
        </>
      ) : null}

      {isError ? (
        <>
          <Link href={"/login"}>
            <Button className="bg-orange-600 hidden md:block">Login</Button>
          </Link>
          <MobileSidebar />
        </>
      ) : null}
      {isSuccess ? (
        <>
          <div>
            <ProfileDropDown LogoutHandler={LogoutHandler} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default LoginButton;
