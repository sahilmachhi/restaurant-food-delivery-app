import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/utils/orderApi";

const OrderStatusHeader = ({ item }: { item: any }) => {
  const getExpectedDelivery = () => {
    const created = new Date(item.createdAt);

    created.setMinutes(
      created.getMinutes() + item.cartItems[0].restaurantId.deliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    console.log(`${hours}:${paddedMinutes}`);

    return `${hours}:${paddedMinutes}`;
  };

  const getOrderStatusInfo = () => {
    return ORDER_STATUS.find((o) => o.value === item.status) || ORDER_STATUS[3];
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status: {getOrderStatusInfo().label}</span>
        <span className="text-black">
          {" "}
          Expected by: {getExpectedDelivery()}
        </span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
