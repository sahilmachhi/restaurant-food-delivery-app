"use client";
import AddressForm from "@/components/AddressForm";
import axios from "axios";
import { useEffect, useState } from "react";

interface urlProp {
  params: {
    slug: string;
  };
}

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

const EditAddress = ({ params }: urlProp) => {
  const addressId: string = params.slug;
  const [address, setAddress] = useState<Address | null>(null);
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
        console.log(response);
        const address = response.find(
          (address: any) => address._id === addressId
        );
        setAddress(address);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  return (
    <>
      <AddressForm address={address} setAddress={setAddress} />
    </>
  );
};

export default EditAddress;
