/* eslint-disable @next/next/no-img-element */
"use client";
import { getSingleRestaurant } from "@/utils/restaurnatApi";
import { Badge, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import AvailableMenus from "./AvailableMenus";
import { Skeleton } from "./ui/skeleton";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any},
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const RestaurantDetail = ({ restaurantId }: { restaurantId: string }) => {
  const [isLoading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<any>({});
  const [isError, setError] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    const { restaurantData, error } = await getSingleRestaurant(restaurantId);
    console.log(restaurantData);
    if (restaurantData) {
      setRestaurant(restaurantData);
    }
    if (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 lg:px-36 md:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center gap-8"
          >
            <Skeleton className="h-64 w-full max-w-md rounded-xl" />
            <Card className="w-full max-w-2xl">
              <CardContent className="p-8 space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex flex-wrap gap-2">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-4 w-40" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <h2 className="text-2xl font-semibold text-destructive">Error Loading Restaurant</h2>
            <p className="text-muted-foreground">{isError.message || "Something went wrong."}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 lg:px-36 md:px-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-8"
        >
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            className="relative w-full max-w-md overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={restaurant?.imageUrl || "/placeholder-image.jpg"}
              alt="Restaurant image"
              className="object-cover h-64 w-full transition-colors"
            />
          </motion.div>
          <Card className="w-full max-w-2xl">
            <CardContent className="p-8 space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-3xl font-bold tracking-tight text-foreground"
              >
                {restaurant?.restaurantName || "Restaurant Name"}
              </motion.h1>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-2"
              >
                {restaurant?.cuisines?.map((cuisine: string, index: number) => (
                  <Badge
                    key={index}
                    className="px-3 py-1 text-sm font-medium"
                  >
                    {cuisine}
                  </Badge>
                )) || (
                  <p className="text-sm text-muted-foreground italic">No cuisines available</p>
                )}
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Delivery Time:
                </span>
                <span className="text-sm font-semibold text-primary">
                  {restaurant?.deliveryTime || "NA"} mins
                </span>
              </motion.div>
            </CardContent>
          </Card>
          {restaurant?.menus && <AvailableMenus menus={restaurant?.menus!} />}
        </motion.div>
      </div>
    </div>
  );
};

export default RestaurantDetail;