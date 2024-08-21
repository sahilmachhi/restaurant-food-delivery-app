"use client";
import axios from "axios";

const HomePage = (): any => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getUser`;

  const getClientData = async () => {
    await axios
      .post(url, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        return (
          <>
            <h1>HomePage section</h1>
          </>
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getClientData();
};

export default HomePage;
