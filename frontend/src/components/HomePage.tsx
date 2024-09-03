"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const HomePage = (): any => {
  const isAuth = useSelector((state: RootState) => state.user.isLoggedIn);

  return <>{isAuth ? <h1>user is found</h1> : <h1>user is not loggedin</h1>}</>;
};

export default HomePage;
