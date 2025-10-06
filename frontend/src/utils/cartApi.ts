import axios from "axios";

export const getCarts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/view_cart`,
      { withCredentials: true }
    );
    return { cartData: response.data.cart.items };
  } catch (error) {
    return { error };
  }
};

export const addToCart = async (itemId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/add_cart/${itemId}`,
      { withCredentials: true }
    );
    return { cartData: response };
  } catch (error) {
    return { error };
  }
};

export const incrementQty = async (itemId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/add_qty/${itemId}`,
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/remove_qty/${itemId}`,
      { withCredentials: true }
    );
    return { cartData: response };
  } catch (error) {
    return { error };
  }
};

export const removeItem = async (itemId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/remove_cart/${itemId}`,
      { withCredentials: true }
    );
    return { cartData: response };
  } catch (error) {
    return { error };
  }
};

export const clearCart = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/cart/clear_cart`,
      { withCredentials: true }
    );
    return { cartData: response };
  } catch (error) {
    return { error };
  }
};
