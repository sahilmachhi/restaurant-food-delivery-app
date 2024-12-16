import RestaurantCard from "@/components/RestaurantCard";
import axios from "axios";
import { cookies } from "next/headers";

const Page = async () => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/restaurant/get_owner_restaurant`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken.value}`,
        },
      }
    );

    const restaurants = response.data.restaurant || [];

    return (
      <div>
        <div>List of Restaurants</div>
        {restaurants.length > 0 ? (
          <div>
            {restaurants.map((restaurant: any) => (
              <RestaurantCard restaurant={restaurant} key={restaurant._id} />
            ))}
          </div>
        ) : (
          <div>No restaurants found.</div>
        )}
      </div>
    );
  } catch (error: any) {
    console.error("Error fetching restaurants:", error.message);

    return (
      <div>
        <div>List of Restaurants</div>
        <div className="error-message">Failed to load restaurants.</div>
        <div>heres error message {error.message}</div>
      </div>
    );
  }
};

export default Page;
