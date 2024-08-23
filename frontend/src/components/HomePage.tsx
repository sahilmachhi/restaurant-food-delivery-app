"use client";
import { PostRequest } from "@/utils/tanstackApiHandler";
import { useEffect } from "react";
const HomePage = (): any => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getUser`;

  const { mutate, data } = PostRequest(url);

  useEffect(() => {
    mutate();
  }, []);
  return (
    <>
      <h1>{data?.data.username}</h1>
    </>
  );
};

export default HomePage;
