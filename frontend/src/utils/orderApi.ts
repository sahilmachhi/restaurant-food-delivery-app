import axios from "axios";

export const requestOrder = async (orderDetails: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/createOrder`,
      orderDetails,
      {
        withCredentials: true,
      }
    );
    return { order: response };
  } catch (error: any) {
    console.error("Error :", error);
    return { error: error?.message || "An error occurred" }; // Return an object with error
  }
};

export const getOrderFromUser = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/get_user_order`,
      {
        withCredentials: true,
      }
    );
    return {
      items: response.data.orders,
      details: response.data.orders,
    };
  } catch (error: any) {
    console.error("Error :", error);
    return { error: error?.message || "An error occurred" }; // Return an object with error
  }
};

// restaurant owner admin route
export const getOrderFromRestaurant = async (restaurantId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/get_restaurant_order/${restaurantId}`,
      {
        withCredentials: true,
      }
    );
    return { order: response.data.orders };
  } catch (error: any) {
    console.error("Error :", error);
    return { error: error?.message || "An error occurred" }; // Return an object with error
  }
};
