"use client";

import { getSingleRestaurant } from "@/utils/restaurnatApi";
import { Badge, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import AvailableMenus from "./AvailableMenus";

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
  }, [RestaurantDetail]);
  return (
    <>
      <div className="max-w-6xl mx-auto my-10">
        <div className="w-full">
          <div className="relative w-full h-32 md:h-64 lg:h-72">
            <img
              src={restaurant?.imageUrl || "Loading..."}
              alt="res_image"
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div className="my-5">
              <h1 className="font-medium text-xl">
                {restaurant?.restaurantName || "Loading..."}
              </h1>
              <div className="flex gap-2 my-2">
                {restaurant?.cuisines
                  ? restaurant?.cuisines.map(
                      (cuisine: string, index: number) => {
                        console.log(cuisine);
                        return <div key={index}>{cuisine}</div>;
                      }
                    )
                  : null}
              </div>
              <div className="flex md:flex-row flex-col gap-2 my-5">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  <h1 className="flex items-center gap-2 font-medium">
                    Delivery Time:{" "}
                    <span className="text-[#D19254]">
                      {restaurant?.deliveryTime || "NA"} mins
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {restaurant?.menus && <AvailableMenus menus={restaurant?.menus!} />}
        </div>
      </div>
    </>
  );
};

export default RestaurantDetail;
