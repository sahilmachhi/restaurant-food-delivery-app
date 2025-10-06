'use client'
import RestaurantCard from "@/components/RestaurantCard";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Store, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

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
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any},
  },
};

const Page = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        // Fetch user to check isSeller
        const userResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/getUser`,{},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setIsSeller(userResponse.data.data.isSeller || false);

        // Fetch restaurants
        const restaurantResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/get_owner_restaurant`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setRestaurants(restaurantResponse.data.restaurant || []);
      } catch (err: any) {
        console.error("Error fetching data:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-4"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              </div>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-3xl font-bold tracking-tight text-foreground">
              Loading Your Restaurants
            </motion.h1>
            <motion.p variants={itemVariants} className="text-muted-foreground">
              Fetching your restaurants...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-md mx-auto"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <Store className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Your Restaurants
              </h1>
            </motion.div>
            <Card>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-destructive/10">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold text-foreground text-center">Failed to Load</h2>
                <p className="text-muted-foreground text-center">Unable to fetch your restaurants at this time.</p>
                <p className="text-sm text-destructive text-center">{error}</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 w-full">
      <div className="container mx-auto px-4 lg:px-36 md:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Your Restaurants
              </h1>
            </div>
            {isSeller && (
              <motion.div whileHover={{ scale: 1.02 }}>
                <Button asChild>
                  <Link href="/my_restaurant/create_restaurant">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Restaurant
                  </Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
          {restaurants.length > 0 ? (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {restaurants.map((restaurant: any) => (
                <RestaurantCard restaurant={restaurant} key={restaurant._id} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <Card className="w-full max-w-md mx-auto">
                <CardContent className="p-8 space-y-4">
                  <Store className="w-12 h-12 text-muted-foreground mx-auto" />
                  <h2 className="text-xl font-semibold text-foreground">No Restaurants Yet</h2>
                  <p className="text-muted-foreground">Get started by adding your first restaurant.</p>
                  {isSeller && (
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Button asChild className="w-full mt-4">
                        <Link href="/my_restaurant/create_restaurant">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Your First Restaurant
                        </Link>
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;