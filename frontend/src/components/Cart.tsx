"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  clearCart,
  decreaseQty,
  getCarts,
  incrementQty,
  removeItem,
} from "@/utils/cartApi";
import { Heading1, Minus, Plus } from "lucide-react";
import { Address } from "@/utils/constants";
import axios from "axios";
import AddressCard from "./AddressCard";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([]);

  const fetchAddress = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/getAddress`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        const response = res.data.userAddress;
        setAddresses(response);
      })
      .catch((error) => console.log(error));
  };

  const orderNow = async (address: any) => {
    const orderDetails = {
      address,
      cart,
      totalPrice,
    };
  };

  const fetchCart = async () => {
    try {
      const { cartData, error } = await getCarts();
      console.log(cartData);

      if (cartData) {
        setCart(cartData);
        const totalPrice = cartData.reduce((total: number, item: any) => {
          const price = item?.productId.price; // Get the price of the product
          const quantity = item?.quantity; // Get the quantity
          return total + price * quantity; // Multiply and add to the total
        }, 0);
        setTotalPrice(totalPrice);
        console.log("Total Price:", totalPrice);
      } else {
        console.log(error);
        // setError(error);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const incrementQuantity = async (itemId: string) => {
    try {
      console.log(itemId);
      const { cartData, error } = await incrementQty(itemId);
      console.log(cartData);

      if (cartData) {
        await fetchCart();
      } else {
        console.log(error);
        // setError(error);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const decrementQuantity = async (itemId: string) => {
    try {
      console.log(itemId);
      const { cartData, error } = await decreaseQty(itemId);
      console.log(cartData);

      if (cartData) {
        await fetchCart();
      } else {
        console.log(error);
        // setError(error);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      console.log(itemId);
      const { cartData, error } = await removeItem(itemId);
      console.log(cartData);

      if (cartData) {
        await fetchCart();
      } else {
        console.log(error);
        // setError(error);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  const clearAllCart = async () => {
    try {
      const { cartData, error } = await clearCart();
      console.log(cartData);

      if (cartData) {
        await fetchCart();
      } else {
        console.log(error);
        // setError(error);
      }
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchAddress();
  }, []);
  return (
    <>
      {open ? (
        <div className="absolute z-20 flex flex-col items-center  h-[380px]  bg-white">
          <div className="flex justify-between items-center w-full mx-auto">
            <div className="text-center flex-1">select address from here</div>
            <div
              className="flex-none cursor-pointer"
              onClick={() => setOpen(false)}
            >
              close
            </div>
          </div>

          <div className=" p-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 overflow-y-scroll">
            {addresses.map((address) => (
              <AddressCard
                key={address._id}
                address={address}
                orderNow={orderNow}
                setOpen={setOpen}
              />
            ))}
          </div>
        </div>
      ) : null}
      <div className="flex flex-col max-w-7xl mx-auto my-10 relative">
        <div className="flex justify-end">
          <Button variant="link" onClick={() => clearAllCart()}>
            Clear All
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Items</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  {/* <Avatar>
                    <AvatarImage src={item.image} alt="" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar> */}
                </TableCell>
                <TableCell> {item.productId.name}</TableCell>
                <TableCell> {item.productId.price}</TableCell>
                <TableCell>
                  <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                    {item.quantity > 1 ? (
                      <Button
                        onClick={() => decrementQuantity(item._id)}
                        size={"icon"}
                        variant={"outline"}
                        className="rounded-full bg-gray-200"
                      >
                        <Minus />
                      </Button>
                    ) : (
                      <Button
                        // onClick={() => decrementQuantity(item._id)}
                        size={"icon"}
                        variant={"ghost"}
                        className="rounded-full bg-gray-200"
                      >
                        <Minus />
                      </Button>
                    )}
                    <Button
                      size={"icon"}
                      className="font-bold border-none"
                      disabled
                      variant={"outline"}
                    >
                      {item.quantity}
                    </Button>
                    <Button
                      onClick={() => incrementQuantity(item._id)}
                      size={"icon"}
                      className="rounded-full bg-orange hover:bg-hoverOrange"
                      variant={"outline"}
                    >
                      <Plus />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{item.productId.price * item.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button
                    size={"sm"}
                    className="bg-red-500 hover:bg-hoverOrange"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="text-2xl font-bold">
              <TableCell colSpan={5}>Total</TableCell>
              {<TableCell className="text-right">{totalPrice}</TableCell>}
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex justify-end my-5 ">
          <Button onClick={() => setOpen(true)}>Proceed To Checkout</Button>
        </div>
        {/* <CheckoutConfirmPage open={open} setOpen={setOpen} /> */}
      </div>
    </>
  );
};

export default Cart;
