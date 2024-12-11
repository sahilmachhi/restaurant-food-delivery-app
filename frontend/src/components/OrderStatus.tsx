/* eslint-disable @next/next/no-img-element */
"use client";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getOrderFromUser } from "@/utils/orderApi";
import React, { useEffect, useState } from "react";

const OrderStatus = () => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    const { details, items, error } = await getOrderFromUser();

    console.log(items);

    if (!items) {
      console.log(error);
    } else {
      setItems(items);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <>
      {items.map((item: any, i) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg" key={i}>
          <OrderStatusHeader item={item} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail item={item} />
            <AspectRatio ratio={16 / 5}>
              <img
                src={item.cartItems[0].restaurantId.imageUrl}
                alt="restaurant image"
                className="rounded-md object-cover h-full w-full"
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderStatus;
