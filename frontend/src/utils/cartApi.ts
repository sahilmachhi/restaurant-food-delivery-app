import axios from "axios";

export const getCarts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/view_cart`,
      { withCredentials: true }
    );
    return { cartData: response.data.cart.items };
  } catch (error) {
    return { error };
  }
};

export const incrementQty = async (itemId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/add_qty/${itemId}`,
      { withCredentials: true }
    );
    return { cartData: response };
  } catch (error) {
    return { error };
  }
};

export const decreaseQty = async (itemId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/cart/remove_qty/${itemId}`,
      { withCredentials: true }
    );
    return { cartData: response };
  } catch (error) {
    return { error };
  }
};
