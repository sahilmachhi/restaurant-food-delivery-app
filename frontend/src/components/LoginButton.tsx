"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import MobileSidebar from "./MobileSidebar";
import ProfileDropDown from "./ProfileDropDown";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, logout, rmUser, setUser } from "@/store/userSlice";

const LoginButton = () => {
  const getUserUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getUser`;
  const LogoutUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/logout`;
  const [isPending, setIsPending] = useState(true);
  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const PostReq = async () => {
      try {
        const response = await axios.post(
          getUserUrl,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        const user = response.data.data;
        dispatch(login());
        dispatch(setUser(user));
        setIsPending(false);
      } catch (error) {
        dispatch(logout());
        setIsPending(false);
      }
    };
    PostReq();
  }, [dispatch, getUserUrl]);

  const LogoutHandler = async () => {
    try {
      await axios.post(
        LogoutUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(logout());
      dispatch(rmUser());
    } catch (error) {
      console.log(`error in logging out: ${error}`);
    }
  };

  return (
    <>
      {isPending ? (
        <>
          <h1>loading</h1>
        </>
      ) : !isAuth ? (
        <>
          <Link href={"/login"}>
            <Button className="bg-orange-600 hidden md:block">Login</Button>
          </Link>
        </>
      ) : (
        <>
          <div className="hidden md:block">
            <ProfileDropDown LogoutHandler={LogoutHandler} />
          </div>
        </>
      )}
      <MobileSidebar user={user} LogoutHandler={LogoutHandler} />
    </>
  );
};

export default LoginButton;
