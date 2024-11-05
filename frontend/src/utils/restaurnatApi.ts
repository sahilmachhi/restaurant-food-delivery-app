import axios from "axios";

export const updateRestaurant = async (
  form: any,
  restaurantId: string | undefined
): Promise<{ data: any } | undefined> => {
  try {
    const data = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurant/update_restaurant/${restaurantId}`,
      form,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const createRestaurant = async (
  form: any
): Promise<{ data: any } | undefined> => {
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurant/create_restaurant`,
      form,
      { withCredentials: true }
    );

    return { data };
  } catch (error) {
    console.log(error);
  }
};
