import { Progress } from "./ui/progress";

const OrderStatusHeader = ({ item }: { item: any }) => {
  const ORDER_STATUS = [
    { label: "pending", value: "pending", progressValue: 10 },
    {
      label: "Awaiting Restaurant Confirmation",
      value: "paid",
      progressValue: 25,
    },
    { label: "In Progress", value: "inProgress", progressValue: 50 },
    { label: "Out for Delivery", value: "outForDelivery", progressValue: 75 },
    { label: "Delivered", value: "delivered", progressValue: 100 },
  ];
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
