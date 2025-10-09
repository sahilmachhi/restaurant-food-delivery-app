import axios from "axios";

export const requestOrder = async (orderDetails: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/order/createOrder`,
      orderDetails,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/order/get_user_order`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/order/get_restaurant_order/${restaurantId}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      }
    );
    return { order: response.data.orders };
  } catch (error: any) {
    console.error("Error :", error);
    return { error: error?.message || "An error occurred" }; // Return an object with error
  }
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/order/update_oder_status/${orderId}`,
      {
        status: orderStatus,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        }
      }
    );
    return { status: response.data };
  } catch (error: any) {
    return { error: error?.message || "An error occurred" };
  }
};

export const ORDER_STATUS = [
  { label: "Payment pending", value: "pending", progressValue: 10 },
  {
    label: "Payment completed awaiting restaurant to confirm order",
    value: "confirmed",
    progressValue: 25,
  },
  {
    label: "Restaurant is Preparing your order",
    value: "preparing",
    progressValue: 50,
  },
  { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
  { label: "Delivered", value: "delivered", progressValue: 100 },
];
