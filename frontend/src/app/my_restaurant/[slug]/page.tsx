"use client";
import RestaurantForm from "@/components/RestaurantForm";
import axios from "axios";
import { use, useEffect, useState } from "react";
interface urlProp {
  params: Promise<{
    slug: string;
  }>;
}

const EditRestaurant = (props: urlProp) => {
  const params = use(props.params);
  const restaurantId: string = params.slug;
  const [restaurant, setRestaurant] = useState({});

  const fetchRestaurant = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/restaurant/view_restaurant/${restaurantId}`
      )
      .then((res) => {
        const restaurant = res.data.restaurant;
        console.log(restaurant);
        setRestaurant(restaurant);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  return (
    <>
      <RestaurantForm
        restaurant={restaurant}
        restaurantId={restaurantId}
        isExistingRestaurant={true}
      />
    </>
  );
};

export default EditRestaurant;
