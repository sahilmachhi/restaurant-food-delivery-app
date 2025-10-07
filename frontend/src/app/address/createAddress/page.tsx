"use client";

import { useState } from "react";
import { Address, newAddressVal } from "../../../utils/constants";
import { motion } from "framer-motion";
import { MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddressForms from "@/components/AddressForms";
import axios from "axios";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const CreateAddress = () => {
  const Router = useRouter();
  const [address, setAddress] = useState<Address | any>({});

  const updateAddressData = async (address: any) => {
    const token = localStorage.getItem('accessToken');
    await axios
      .post("http://localhost:5000/api/user/createAddress", address, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
      })
      .then((data) => {
        if (data.data.success) {
          Router.push(`/address`);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-36 md:px-16 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="p-0 h-auto w-auto">
              <Link href="/address" className="flex items-center gap-2 hover:bg-transparent">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Create New Address
                </h1>
                <p className="text-sm text-muted-foreground">Add a delivery address for your orders</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <AddressForms address={address} updateAddressData={updateAddressData} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAddress;