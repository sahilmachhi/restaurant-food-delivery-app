"use client";
import { useState } from "react";
import { Address, newAddressVal } from "../../../utils/constants";
import AddressForm from "@/components/AddressForm";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateAddress = () => {
  const Router = useRouter();
  const [address, setAddress] = useState<Address | any>(newAddressVal);

  const updateAddressData = async () => {
    await axios
      .post("http://localhost:5000/api/user/createAddress", address, {
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

  return (
    <>
      <AddressForm
        address={address}
        setAddress={setAddress}
        updateAddressData={updateAddressData}
      />
    </>
  );
};

export default CreateAddress;
