import { z } from "zod";

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
  imageUrl: z.instanceof(File, {
    message: "image of restaurant is required",
  }),
  menus: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      description: z.string().min(1, "name is required"),
      price: z.coerce.number({
        required_error: "product price is required",
        invalid_type_error: "price must be in number",
      }),
      imageUrl: z.instanceof(File, {
        message: "image of menu item is required",
      }),
    })
  ),
});

const page = () => {
  return (
    <>
      <h1>create restaurant form</h1>
    </>
  );
};

export default page;
