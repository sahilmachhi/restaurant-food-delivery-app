"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import ProfileDropDown from "./ProfileDropDown";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login, logout, rmUser, setUser, loadingDone, loadingStart } from "@/store/userSlice";

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const LoginButton = () => {
  const getUserUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/getUser`;
  const LogoutUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/user/logout`;
  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);
  const user = useSelector((state: RootState) => state.user.user);
  const isPending = useSelector((state: RootState) => state.user.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("use effect called");
    const fetchUser = async () => {
      dispatch(loadingStart());

      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(`Access Token: ${accessToken}`);
        if (!accessToken) {
          // No token → user is logged out
          dispatch(logout());
          dispatch(loadingDone());
          return;
        }

        const response = await axios.post(
          getUserUrl,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const user = response.data.data;

        // console.log(user)
        dispatch(login());
        dispatch(setUser(user));
        dispatch(loadingDone())
        console.log(`is loading is pending ? ${isPending}`)
      } catch (error: any) {
        console.error("Get user failed:", error.response?.data || error.message);

        // Token invalid or expired → clear frontend state
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(logout());
        dispatch(setUser(null));
      } finally {
        dispatch(loadingDone());
      }
    };

    fetchUser();
  }, []);

  const LogoutHandler = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        LogoutUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        // ✅ Backend confirmed logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        dispatch(logout());
        dispatch(rmUser());

        window.location.href = "/login";
      } else {
        console.warn("Logout not confirmed by server:", response.data.message);
        // Optionally still clear frontend tokens
      }
    } catch (error: any) {
      console.error("Logout failed:", error.response?.data || error.message);
      // Optionally clear frontend tokens anyway
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(logout());
      dispatch(rmUser());
      window.location.href = "/login";
    }
  };

  return (
    <>
      {isPending ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="hidden md:block"
        >
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </motion.div>
      ) : !isAuth ? (
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          className="hidden md:block"
        >
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Login
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          className="hidden md:block rounded-full ring-2 ring-primary/20 cursor-pointer"
        >
          <ProfileDropDown LogoutHandler={LogoutHandler} />
        </motion.div>
      )}
      <MobileSidebar user={user} LogoutHandler={LogoutHandler} />
    </>
  );
};

export default LoginButton;