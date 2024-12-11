import { Separator } from "./ui/separator";

const OrderStatusDetail = ({ item }: { item: any }) => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className="font-bold">Delivering to:</span>
        <span>{item.user.fullname}</span>
        <span>
          {item.address.address.addressLine1}, {item.address.address.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold">Your Order</span>
        <ul>
          {item.cartItems.map((item: any, i: string) => (
            <li key={i}>
              {item.productId.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold">Total</span>
        <span>£{(item.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
