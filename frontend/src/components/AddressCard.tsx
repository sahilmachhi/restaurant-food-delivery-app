import Link from "next/link";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Edit2, Trash2, Crown, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const cardVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const deleteVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "hsl(var(--destructive) / 0.9)",
    boxShadow: "0 8px 25px rgba(239, 68, 68, 0.3)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const defaultVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "hsl(var(--primary) / 0.9)",
    boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const AddressCard = ({
  address,
  deleteAddress,
  orderNow,
  setOpen,
}: {
  address: any;
  deleteAddress?: any;
  orderNow?: any;
  setOpen?: any;
}) => {
  const orderSignal = (address: any) => {
    orderNow(address);
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="w-full"
    >
      <Card className="overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-background to-muted/50">
        <CardContent className="p-6 space-y-4">
          <div
            onClick={() => {
              if (!deleteAddress) {
                orderSignal(address);
                setOpen(false);
              }
            }}
            className="cursor-pointer space-y-2"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <h1 className="text-lg font-semibold text-foreground">{address.name}</h1>
            </div>
            <h2 className="text-sm font-medium text-muted-foreground">{address.address.name}</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="flex items-center gap-1">
                {address.address.addressLine1}
                {address.address.addressLine2 && `, ${address.address.addressLine2}`}
              </p>
              <p>{`${address.address.city} - ${address.address.pincode}`}</p>
              <p>{`${address.address.district}, ${address.address.state}, ${address.address.country}`}</p>
            </div>
          </div>
          {deleteAddress ? (
            <div className="flex flex-col w-full gap-2 pt-4 border-t border-border/20">
              <motion.div whileHover="hover" whileTap="tap">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary hover:bg-primary/5"
                >
                  <Link href={`/address/${address._id}`} prefetch={false} className="flex items-center gap-2 w-full justify-center">
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover="default" whileTap="tap">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 h-10 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 w-full"

                >
                  <Crown className="w-3 h-3 mr-1" />
                  Set as Default
                </Button>
              </motion.div>
              <motion.div whileHover="hover" whileTap="tap">
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1 h-10 bg-destructive/10 hover:bg-destructive/20 border-destructive/30 text-destructive w-full"
                  onClick={() => deleteAddress(address._id)}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Delete
                </Button>
              </motion.div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddressCard;