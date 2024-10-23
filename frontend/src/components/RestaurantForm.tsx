"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import CuisinesForm from "./CuisinesForm";
import { Button } from "./ui/button";

const RestaurantForm = () => {
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
    // imageUrl: z.instanceof(File, {
    //   message: "image of restaurant is required",
    // }),
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
    formState: { errors },
  } = useForm<input>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (form: input) => {
    console.log("on submit is called");
    console.log(form);
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
              <CuisinesForm register={register} />
            </div>
            {/* <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Restaurant Image</label>
              <Input {...register("imageUrl")} type="file" />
            </div> */}
            {/* {errors ? (
              <div>
                <h1>{errors?.restaurantName}</h1>
                <h1>{errors.city}</h1>
                <h1>{errors.country}</h1>
                <h1>{errors.cuisines}</h1>

                <h1>{errors.deliveryTime}</h1>
                <h1>{errors.imageUrl}</h1>
              </div>
            ) : null} */}
            <Button type="submit">submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestaurantForm;
