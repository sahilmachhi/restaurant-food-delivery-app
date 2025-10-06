"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddressCard from "@/components/AddressCard";
import { Address } from "@/utils/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
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

const addVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const UserAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const fetchAddress = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/getAddress`, {
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
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/deleteAddress/${addressUrl}`,
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
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 lg:px-36 md:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Your Addresses
            </h1>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="grid w-full md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6"
          >
            {addresses.map((address) => (
              <motion.div variants={itemVariants} key={address._id}>
                <AddressCard
                  address={address}
                  deleteAddress={deleteAddress}
                />
              </motion.div>
            ))}
            <motion.div
              variants={addVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="h-full flex items-center justify-center border-2 border-dashed border-border hover:border-primary transition-colors duration-200">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-primary group-hover:rotate-90 transition-transform duration-200" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">Add New Address</h3>
                    <p className="text-sm text-muted-foreground">Save a new delivery address</p>
                  </div>
                  <Button asChild variant="outline" size="sm" className="mt-4">
                    <Link href="/address/createAddress">
                      Create Address
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAddress;