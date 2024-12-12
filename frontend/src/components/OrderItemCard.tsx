import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ORDER_STATUS, updateOrderStatus } from "@/utils/orderApi";

const OrderItemCard = ({ order }: { order: any }) => {
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: any) => {
    setLoading(true);
    const { status } = await updateOrderStatus(order._id, newStatus);
    console.log(status);
    setStatus(newStatus);
    setLoading(false);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name:
            <span className="ml-2 font-normal">{order.user.fullname}</span>
          </div>
          <div>
            Delivery address:
            <span className="ml-2 font-normal">
              {order.address.address.addressLine1}, {order.address.address.city}
            </span>
          </div>
          <div>
            Time:
            <span className="ml-2 font-normal">{getTime()}</span>
          </div>
          <div>
            Total Cost:
            <span className="ml-2 font-normal">
              £{(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem: any, i: string) => (
            <span key={i}>
              <Badge variant="outline" className="mr-2">
                {cartItem.quantity}
              </Badge>
              {cartItem.productId.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status">What is the status of this order?</Label>
          <Select
            value={status}
            disabled={loading}
            onValueChange={(value) => handleStatusChange(value)}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
