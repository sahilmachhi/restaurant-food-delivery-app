"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Upload, Clock } from "lucide-react";
import CuisinesForm from "./CuisinesForm";
import { useEffect } from "react";
import { createRestaurant, updateRestaurant } from "@/utils/restaurnatApi";
import { useRouter } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any},
  },
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const RestaurantForm = ({
  restaurant,
  isExistingRestaurant,
  restaurantId,
}: {
  restaurant?: any;
  isExistingRestaurant: boolean;
  restaurantId?: string;
}) => {
  const router = useRouter();
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
    imageFile: z.any(),
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
      imageFile: null,
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
        imageFile: null,
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
    if (form.imageFile) {
      console.log("imageurl found");
      formData.append("imageFile", form.imageFile[0]);
    }

    if (isExistingRestaurant) {
      let data = await updateRestaurant(formData, restaurantId);
      console.log("restaurant update done");
      if (data) {
        console.log("Update response:", data);
      } else {
        console.log("Failed to update the restaurant");
      }
    } else {
      const data = await createRestaurant(formData);
      console.log(data);
      // revalidatePath("/myRestaurant");
      router.push("/my_restaurant");
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          <Form {...{control, register, handleSubmit}}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName" className="text-sm font-medium text-foreground">
                    Restaurant Name
                  </Label>
                  <Input
                    id="restaurantName"
                    placeholder="Enter restaurant name"
                    className="h-12"
                    {...register("restaurantName")}
                  />
                  {errors.restaurantName && (
                    <p className="text-sm text-destructive">{errors.restaurantName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-foreground">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    className="h-12"
                    {...register("city")}
                  />
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="country" className="text-sm font-medium text-foreground">
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="Enter country"
                    className="h-12"
                    {...register("country")}
                  />
                  {errors.country && (
                    <p className="text-sm text-destructive">{errors.country.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryTime" className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Estimated Delivery Time (mins)
                  </Label>
                  <Input
                    id="deliveryTime"
                    type="number"
                    placeholder="Enter delivery time"
                    className="h-12"
                    {...register("deliveryTime")}
                  />
                  {errors.deliveryTime && (
                    <p className="text-sm text-destructive">{errors.deliveryTime.message}</p>
                  )}
                </div>
                <div className="md:col-span-2" />
                <div className="md:col-span-2">
                  <motion.div variants={itemVariants}>
                    <CuisinesForm control={control} />
                  </motion.div>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="imageFile" className="text-sm font-medium text-foreground flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    Restaurant Image
                  </Label>
                  <Input
                    id="imageFile"
                    type="file"
                    accept="image/*"
                    className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    {...register("imageFile")}
                  />
                  {errors.imageFile?.message && (
                    <p className="text-sm text-destructive">{String(errors.imageFile.message)}</p>
                  )}
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button type="submit" className="w-full h-12" variant={"default"}>
                  {isExistingRestaurant ? "Update Restaurant" : "Create Restaurant"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RestaurantForm;