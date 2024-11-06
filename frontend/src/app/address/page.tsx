"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import AddressCard from "@/components/AddressCard";
import { Address } from "@/utils/constants";

const UserAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const fetchAddress = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getAddress`, {
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

  const deleteAddress = async (addressUrl: string) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/deleteAddress/${addressUrl}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((data) => {
        if (data.data.success) {
          fetchAddress();
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <>
      <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10">
        {addresses.map((address) => (
          <AddressCard
            key={address._id}
            address={address}
            deleteAddress={deleteAddress}
          />
        ))}
        <div>
          <Link href={`/address/createAddress`}>create address</Link>
        </div>
      </div>
    </>
  );
};

export default UserAddress;
