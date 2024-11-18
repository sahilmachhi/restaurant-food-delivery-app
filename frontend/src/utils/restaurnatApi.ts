import { searchState } from "@/components/HomePage";
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
          "Content-Type": "multipart/form-data",
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
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const getAllRestaurants = async () => {
  try {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurant/get_all_restaurants`
    );
    const restaurants = data.data.restuarants;
    return { restaurants };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const searchRestaurant = (searchState: searchState) => {
  try {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    // params.set("page", searchState.page.toString());
    // params.set("sortOption", searchState.sortOption);

    console.log(params.toString());
  } catch (error) {
    return { error };
  }
};

export const getSingleRestaurant = async (restuarantId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurant/view_restaurant/${restuarantId}`
    );
    return { restaurantData: response.data.restaurant };
  } catch (error) {
    return { error };
  }
};
