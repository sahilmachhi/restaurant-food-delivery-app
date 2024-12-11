/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import Link from "next/link";

const convertMinutesToTime = (minutes: number) => {
  const days = Math.floor(minutes / (24 * 60)); // Calculate days
  const hours = Math.floor((minutes % (24 * 60)) / 60); // Calculate hours
  const remainingMinutes = minutes % 60; // Calculate remaining minutes

  const daysDisplay = days > 0 ? `${days} day${days > 1 ? "s" : ""} ` : "";
  const hoursDisplay = hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} ` : "";
  const minutesDisplay =
    remainingMinutes > 0
      ? `${remainingMinutes} minute${remainingMinutes > 1 ? "s" : ""}`
      : "";

  return `${daysDisplay}${hoursDisplay}${minutesDisplay}`.trim();
};
const SearchResultCard = ({ restaurant }: { restaurant: any }) => {
  return (
    <Link
      href={`/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
          alt="restaurant image"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines
              ? restaurant.cuisines.map((item: any, index: number) => (
                  <span className="flex" key={index}>
                    <span>{item}</span>
                    {index < restaurant.cuisines.length - 1 && <Dot />}
                  </span>
                ))
              : null}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {convertMinutesToTime(restaurant.deliveryTime)}
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
