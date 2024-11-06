"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import CuisinesForm from "./CuisinesForm";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { createRestaurant, updateRestaurant } from "@/utils/restaurnatApi";

const RestaurantForm = ({
  restaurant,
  isExistingRestaurant,
  restaurantId,
}: {
  restaurant?: any;
  isExistingRestaurant: boolean;
  restaurantId?: string;
}) => {
  const formSchema = z.object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    imageUrl: z.any(),
    // menus: z.array(
    //   z.object({
    //     name: z.string().min(1, "name is required"),
    //     description: z.string().min(1, "name is required"),
    //     price: z.coerce.number({
    //       required_error: "product price is required",
    //       invalid_type_error: "price must be in number",
    //     }),
    //     imageUrl: z.instanceof(File, {
    //       message: "image of menu item is required",
    //     }),
    //   })
    // ),
  });

  type input = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<input>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurantName: "",
      city: "",
      country: "",
      deliveryTime: 0,
      cuisines: [], // Ensure cuisines is always an array
      imageUrl: null,
    },
  });

  useEffect(() => {
    if (restaurant) {
      console.log("reset running");
      reset({
        restaurantName: restaurant.restaurantName || "",
        city: restaurant.city || "",
        country: restaurant.country || "",
        deliveryTime: restaurant.deliveryTime || "",
        cuisines: restaurant.cuisines || [],
        imageUrl: null,
      });
    }
  }, [restaurant, reset]);

  const onSubmit = async (form: input) => {
    const formData = new FormData();
    formData.append("restaurantName", form.restaurantName);
    formData.append("city", form.city);
    formData.append("country", form.country);
    formData.append("deliveryTime", form.deliveryTime.toString());
    form.cuisines.forEach((cuisine: any, index: any) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    if (form.imageUrl) {
      formData.append("imageFile", form.imageUrl);
      console.log("imageurl found");
    }

    console.log(form);
    if (isExistingRestaurant) {
      let data = await updateRestaurant(formData, restaurantId);
      console.log("restaurant update done");
      if (data) {
        console.log("Update response:", data);
      } else {
        console.log("Failed to update the restaurant");
      }
    } else {
      createRestaurant(form);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-8 justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 justify-center items-center"
          >
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Restaurant Name</label>
              <Input
                placeholder="Enter restaurant name here"
                {...register("restaurantName")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>City</label>
              <Input placeholder="Enter city name here" {...register("city")} />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>country</label>
              <Input
                placeholder="Enter country name here"
                {...register("country")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>deliveryTime</label>
              <Input
                placeholder="Please write Delivery time here"
                {...register("deliveryTime")}
              />
            </div>

            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <CuisinesForm control={control} />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Restaurant Image</label>
              <Input {...register("imageUrl")} type="file" />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestaurantForm;
