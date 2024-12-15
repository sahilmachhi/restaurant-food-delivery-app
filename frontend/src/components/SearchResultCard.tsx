/* eslint-disable @next/next/no-img-element */
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot, Globe, MapPin } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

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
    <>
      <Card
        key={restaurant._id}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
      >
        <div className="relative">
          <AspectRatio ratio={16 / 6}>
            <img
              src={restaurant.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg px-3 py-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Featured
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {restaurant.restaurantName}
          </h1>
          <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
            <MapPin size={16} />
            <p className="text-sm">
              City: <span className="font-medium">{restaurant.city}</span>
            </p>
          </div>
          <div className="mt-2 gap-1 flex items-center text-gray-600 dark:text-gray-400">
            <Globe size={16} />
            <p className="text-sm">
              Country: <span className="font-medium">{restaurant.country}</span>
            </p>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {restaurant.cuisines.map((cuisine: string, idx: number) => (
              <Badge
                key={idx}
                className="font-medium px-2 py-1 rounded-full shadow-sm"
              >
                {cuisine}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
          <Link href={`/${restaurant._id}`}>
            <Button className="bg-orange-400 hover:bg-orange-700 font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
              View Menus
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );

  // return (
  //   <Link
  //     href={`/${restaurant._id}`}
  //     className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
  //   >
  //     <AspectRatio ratio={16 / 6}>
  //       <img
  //         src={restaurant.imageUrl}
  //         className="rounded-md w-full h-full object-cover"
  //         alt="restaurant image"
  //       />
  //     </AspectRatio>
  //     <div>
  //       <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:underline">
  //         {restaurant.restaurantName}
  //       </h3>
  //       <div id="card-content" className="grid md:grid-cols-2 gap-2">
  //         <div className="flex flex-row flex-wrap">
  //           {restaurant.cuisines
  //             ? restaurant.cuisines.map((item: any, index: number) => (
  //                 <span className="flex" key={index}>
  //                   <span>{item}</span>
  //                   {index < restaurant.cuisines.length - 1 && <Dot />}
  //                 </span>
  //               ))
  //             : null}
  //         </div>
  //         <div className="flex gap-2 flex-col">
  //           <div className="flex items-center gap-1 text-green-600">
  //             <Clock className="text-green-600" />
  //             {convertMinutesToTime(restaurant.deliveryTime)}
  //           </div>
  //           <div className="flex items-center gap-1">
  //             <Banknote />
  //             Delivery from £{(restaurant.deliveryPrice / 100).toFixed(2)}
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </Link>
  // );
};

export default SearchResultCard;
