"use client";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getOrderFromUser } from "@/utils/orderApi";
import React, { useEffect, useState } from "react";

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    const { order, error } = await getOrderFromUser();

    if (!order) {
      console.log(error);
    } else {
      console.log(order);
      //   setOrders(order);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      {orders.map((order, i) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg" key={i}>
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16 / 5}>
              {/* <img
                 src={order.restaurant.imageUrl}
                className="rounded-md object-cover h-full w-full"
              /> */}
            </AspectRatio>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderStatus;
