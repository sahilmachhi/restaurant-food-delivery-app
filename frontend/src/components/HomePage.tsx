"use client";
import axios from "axios";
import { useState } from "react";

const HomePage = (): any => {
  const [user, SetUser] = useState();
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getUser`;
  const getClientData = async () => {
    await axios
      .post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        const username = res.data.data.username;
        SetUser(username);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getClientData();

  return <>{user ? <h1>User is:{user}</h1> : <h1>User is not found</h1>}</>;
};

export default HomePage;
