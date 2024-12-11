/* eslint-disable @next/next/no-img-element */
import { addToCart } from "@/utils/cartApi";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

const AvailableMenus = ({ menus }: { menus: any }) => {
  const addCart = async (itemId: string) => {
    try {
      console.log(itemId);
      const { cartData, error } = await addToCart(itemId);
      console.log(cartData);

      if (cartData) {
        // await fetchCart();
      } else {
        console.log(error);
        // setError(error);
      }
    } catch (error: any) {
      // setError(error);
    }
  };

  return (
    <>
      <div className="md:p-4">
        <h1 className="text-xl md:text-2xl font-extrabold mb-6">
          Available Menus
        </h1>
        <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
          {menus.map((menu: any, index: number) => (
            <Card
              className="max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden"
              key={index}
            >
              <img
                src={menu.imageUrl}
                alt="menu image"
                className="w-full h-40 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {menu.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                <h3 className="text-lg font-semibold mt-4">
                  Price: <span className="text-[#D19254]">₹{menu.price}</span>
                </h3>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  onClick={() => {
                    addCart(menu._id);
                    // navigate("/cart");
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-900"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AvailableMenus;
