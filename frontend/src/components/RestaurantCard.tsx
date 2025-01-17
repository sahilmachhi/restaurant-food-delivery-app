"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

const RestaurantCard = ({ restaurant }: { restaurant: any }) => {
  const router = useRouter();
  const DeleteRestaurant = async (restaurantId: string) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurant/delete_restaurant/${restaurantId}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {restaurant.restaurantName}
        </h5>
        <div className="flex justify-center items-center gap-3">
          <Link href={`/manageRestaurant/${restaurant._id}`} prefetch={false}>
            <Button className="bg-green-400 hover:bg-green-700">
              Manage Orders
            </Button>
          </Link>

          <Link href={`/myRestaurant/${restaurant._id}`} prefetch={false}>
            <Button>Edit</Button>
          </Link>
          <Link href={`/menus/${restaurant._id}`} prefetch={false}>
            <Button>Edit Menus</Button>
          </Link>
          <Button
            variant={"destructive"}
            onClick={() => {
              DeleteRestaurant(restaurant._id);
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
