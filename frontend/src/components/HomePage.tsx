"use client";
import { useEffect } from "react";
import { PostRequest } from "@/utils/tanstackApiHandler";

const HomePage = (): any => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getUser`;

  const { mutate, isPending, isSuccess, isError } = PostRequest(url, ["user"]);

  useEffect(() => {
    mutate();
  }, [mutate]);
  return (
    <>
      {isSuccess ? <h1>user is found</h1> : null}
      {isPending ? <h1>loading...</h1> : null}
      {isError ? <h1>user is not loggedin</h1> : null}
    </>
  );
};

export default HomePage;
