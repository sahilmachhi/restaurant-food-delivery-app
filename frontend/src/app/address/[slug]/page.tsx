"use client";
import axios from "axios";
import { useEffect, useState, use } from "react";
import { Address } from "../../../utils/constants";
import { useRouter } from "next/navigation";
import AddressForms from "@/components/AddressForms";

interface urlProp {
  params: Promise<{
    slug: string;
  }>;
}

const EditAddress = (props: urlProp) => {
  const params = use(props.params);
  const addressId: string = params.slug;
  const Router = useRouter();
  const [address, setAddress] = useState<Address | any>({});

  const updateAddressData = async (address: any) => {
    const UpdatedAddress = { ...address, _id: addressId };
    console.log(UpdatedAddress);
    await axios
      .put("http://localhost:5000/api/user/updateAddress", UpdatedAddress, {
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
      <AddressForms address={address} updateAddressData={updateAddressData} />
    </>
  );
};

export default EditAddress;
