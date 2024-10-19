"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Address } from "../../../utils/constants";
import { useRouter } from "next/navigation";
import AddressForms from "@/components/AddressForms";

interface urlProp {
  params: {
    slug: string;
  };
}

const EditAddress = ({ params }: urlProp) => {
  const Router = useRouter();
  const addressId: string = params.slug;
  const [address, setAddress] = useState<Address | any>();

  const updateAddressData = async (address: any) => {
    // console.log(address);
    await axios
      .put("http://localhost:5000/api/user/updateAddress", address, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((data) => {
        if (data.data.success) {
          Router.push(`/address`);
        }
      })
      .catch((error) => console.log(error));
  };

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
        return address;
      })
      .catch((error) => console.log(error));
    return address;
  };

  // useEffect(() => {
  //   fetchAddress();
  // }, []);
  return (
    <>
      <AddressForms
        address={address}
        updateAddressData={updateAddressData}
        fetchAddress={fetchAddress}
      />
    </>
  );
};

export default EditAddress;
