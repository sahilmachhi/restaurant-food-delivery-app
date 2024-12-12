"use client";
import { getOrderFromRestaurant } from "@/utils/orderApi";
import { Tabs, TabsContent } from "./ui/tabs";
import { useEffect, useState } from "react";
import OrderItemCard from "./OrderItemCard";

const RestaurantManagePage = ({ slug }: { slug: string }) => {
  const [orders, setOrders] = useState([]);
  const fetchRestaurantPage = async () => {
    const { order, error } = await getOrderFromRestaurant(slug);

    if (!order) {
      console.log(error);
    } else {
      console.log(order);
      setOrders(order);
    }
  };

  useEffect(() => {
    fetchRestaurantPage();
  }, []);
  return (
    <>
      <Tabs defaultValue="orders">
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
          {orders?.map((order, i) => (
            <OrderItemCard order={order} key={i} />
          ))}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default RestaurantManagePage;
