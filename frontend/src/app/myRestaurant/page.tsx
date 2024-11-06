import RestaurantCard from "@/components/RestaurantCard";
import axios from "axios";
import { cookies } from "next/headers";

const page = async () => {
  try {
    const cookieStore: any = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurant/get_owner_restaurant`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken.value}`,
        },
      }
    );
    const restaurants = response.data.restaurant;

    return (
      <>
        <div>list of restaurants</div>
        <div>
          {restaurants.map((restaurant: any) => (
            <RestaurantCard restaurant={restaurant} key={restaurant._id} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
  }
};

export default page;
