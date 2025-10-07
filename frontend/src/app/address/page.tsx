"use client";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MapPin, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import AddressCard from "@/components/AddressCard";
import { Address } from "@/utils/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const addCardVariants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
  hover: {
    scale: 1.05,
    rotate: 1,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
    backgroundColor: "hsl(var(--primary) / 0.9)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const UserAddress = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const fetchAddress = async () => {
    setIsLoading(true);
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/getAddress`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const response = res.data.userAddress;
        setAddresses(response);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const deleteAddress = async (addressUrl: string) => {
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/deleteAddress/${addressUrl}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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

  if (isLoading) {
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
              <MapPin className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Your Addresses
              </h1>
            </motion.div>
            <motion.div
              variants={gridVariants}
              className="grid w-full md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div variants={itemVariants} key={i}>
                  <Card className="overflow-hidden shadow-sm border-border/20">
                    <CardContent className="p-6 space-y-4">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-4 w-1/2 rounded" />
                      <div className="space-y-2">
                        <Skeleton className="h-3 w-full rounded" />
                        <Skeleton className="h-3 w-4/5 rounded" />
                      </div>
                      <div className="flex justify-end pt-2">
                        <Skeleton className="h-8 w-20 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 backdrop-blur-sm py-12">
      <div className="container mx-auto px-4 lg:px-36 md:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-6 h-6 text-primary"
            >
              <MapPin />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Your Addresses
            </h1>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={addresses.length}
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid w-full md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-6"
            >
              {addresses.map((address, index) => (
                <motion.div
                  key={address._id}
                  variants={itemVariants}
                  custom={index}
                  className="group"
                >
                  <AddressCard
                    address={address}
                    deleteAddress={deleteAddress}
                  />
                </motion.div>
              ))}
              <motion.div
                variants={addCardVariants}
                whileHover="hover"
                className="group relative overflow-hidden"
              >
                <Card className="h-full flex items-center justify-center border-2 border-dashed border-border hover:border-primary transition-all duration-300 bg-gradient-to-br from-accent/20 to-primary/10 backdrop-blur-sm shadow-lg hover:shadow-2xl">
                  <CardContent className="p-8 text-center space-y-4 relative z-10">
                    <motion.div
                      animate={{ rotate: addresses.length % 2 === 0 ? 180 : 0 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                      className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
                    >
                      <Plus className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                        Add New Address
                      </h3>
                      <p className="text-sm text-muted-foreground">Save a new delivery address for seamless ordering</p>
                    </div>
                    <motion.div whileHover="hover">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mt-4 bg-gradient-to-r from-primary/10 to-primary/20 border-primary/30 hover:from-primary/20 hover:to-primary/30 text-primary font-semibold shadow-lg hover:shadow-primary/20 transition-all duration-300"
                        
                      >
                        <Link href="/address/createAddress" className="flex items-center gap-2">
                          Create Address
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                      </Button>
                    </motion.div>
                  </CardContent>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ pointerEvents: "none" }}
                  />
                </Card>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default UserAddress;