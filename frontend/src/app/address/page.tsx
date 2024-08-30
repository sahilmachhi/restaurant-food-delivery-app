"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const UserAddress = () => {
  interface Address {
    name: string;
    address: {
      name: string;
      addressLine1: string;
      addressLine2: string;
      city: string;
      pincode: number;
      district: string;
      state: string;
      country: string;
    };
    _id: string;
  }
  const [addresses, setAddresses] = useState<Address[]>([]);

  const fetchAddress = async () => {
    await axios
      .get("http://localhost:5000/api/user/getAddress", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data.userAddress;

        setAddresses(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <>
      <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
        {addresses.map((address) => (
          <div
            className="w-full flex flex-col gap-10 rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-10"
            key={address._id}
          >
            <div>
              <h1>{address.name}</h1>
              <h2>{address.address.name}</h2>
              <div className="flex-col flex gap-2">
                <p>
                  {address.address.addressLine1},{address.address.addressLine2}
                </p>
                <p>
                  {address.address.city} - {address.address.pincode},
                </p>
                <p>
                  {address.address.district}, {address.address.state},{" "}
                  {address.address.country}
                </p>
                <h1>{address._id}</h1>
              </div>
              <div className="flex gap-2 w-full md:flex-row flex-col justify-center items-center mt-5">
                <Link href={`/address/${address._id}`} className="w-full">
                  <Button className="w-full bg-yellow-300 text-black hover:bg-yellow-700 hover:text-white">
                    edit
                  </Button>
                </Link>
                <Button className="w-full bg-red-400 hover:bg-red-700">
                  delete
                </Button>
                <Button className="w-full bg-green-400 hover:bg-green-700">
                  set as Default
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserAddress;
