"use client";
import { getOrderFromRestaurant } from "@/utils/orderApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";

const RestaurantManagePage = ({ slug }: { slug: string }) => {
  const [orders, setOders] = useState({});
  const fetchRestaurantPage = async () => {
    const { order, error } = await getOrderFromRestaurant(slug);

    console.log(order);
    console.log(error);
  };

  useEffect(() => {
    fetchRestaurantPage();
  }, []);
  return (
    <>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          {/* <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))} */}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          {/* <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading || isUpdateLoading}
          /> */}
        </TabsContent>
      </Tabs>
    </>
  );
};

export default RestaurantManagePage;
