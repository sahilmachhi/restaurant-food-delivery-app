/* eslint-disable @next/next/no-img-element */
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
  }, []);
  return (
    <>
      <div className="w-full mx-auto lg:px-36 px-2 md:px-16">
        <div className="w-full flex justify-center flex-col">
          <div className="flex items-center justify-center">
            <div className="relative w-[490px]">
              <img
                src={restaurant?.imageUrl || "Loading..."}
                alt="res_image"
                className="object-cover  h-full w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
          <div className="flex flex-col self-start">
            <div className="my-5">
              <h1 className="font-medium text-xl">
                {restaurant?.restaurantName || "Loading..."}
              </h1>
              <div className="flex gap-2 my-2 w-full">
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
