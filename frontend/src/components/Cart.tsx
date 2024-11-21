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
import { decreaseQty, getCarts, incrementQty } from "@/utils/cartApi";
import { Minus, Plus } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

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

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <>
      <div className="flex flex-col max-w-7xl mx-auto my-10">
        <div className="flex justify-end">
          <Button variant="link">Clear All</Button>
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
        <div className="flex justify-end my-5">
          <Button
            // onClick={() => setOpen(true)}
            className="bg-orange hover:bg-hoverOrange"
          >
            Proceed To Checkout
          </Button>
        </div>
        {/* <CheckoutConfirmPage open={open} setOpen={setOpen} /> */}
      </div>
    </>
  );
};

export default Cart;
