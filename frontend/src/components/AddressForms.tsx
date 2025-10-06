import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const AddressForms = ({
  address,
  updateAddressData,
}: {
  address?: any;
  updateAddressData: any;
}) => {
  console.log(address?.name);
  const schema = z.object({
    name: z.string().min(1, { message: "please enter name" }),

    address: z.object({
      name: z.string(),
      addressLine1: z.string(),
      addressLine2: z.string(),
      city: z.string(),
      district: z.string(),
      state: z.string(),
      country: z.string(),
      pincode: z.string(),
    }),
  });
  type input = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<input>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  useEffect(() => {
    if (address) {
      reset({
        name: address.name || "",

        address: {
          name: address.address?.name || "",
          addressLine1: address.address?.addressLine1 || "",
          addressLine2: address.address?.addressLine2 || "",
          city: address.address?.city || "",
          district: address.address?.district || "",
          state: address.address?.state || "",
          country: address.address?.country || "",
          pincode: address.address?.pincode || "",
        },
      });
    }
  }, [address, reset]); // Reset when address data changes

  const onSubmit = (data: any) => {
    updateAddressData(data);
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">
                    Address Tag Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter tag name"
                    className="h-12"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="address-name" className="text-sm font-medium text-foreground">
                    Name as per address
                  </Label>
                  <Input
                    id="address-name"
                    placeholder="Enter name as per address"
                    className="h-12"
                    {...register("address.name")}
                  />
                  {errors.address?.name && (
                    <p className="text-sm text-destructive">{errors.address?.name.message}</p>
                  )}
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="address-line1" className="text-sm font-medium text-foreground">
                    Address Line 1
                  </Label>
                  <Input
                    id="address-line1"
                    placeholder="Enter address line 1"
                    className="h-12"
                    {...register("address.addressLine1")}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="address-line2" className="text-sm font-medium text-foreground">
                    Address Line 2
                  </Label>
                  <Input
                    id="address-line2"
                    placeholder="Enter address line 2"
                    className="h-12"
                    {...register("address.addressLine2")}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-foreground">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    className="h-12"
                    {...register("address.city")}
                  />
                </motion.div>
              </div>
              <div className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="district" className="text-sm font-medium text-foreground">
                    District
                  </Label>
                  <Input
                    id="district"
                    placeholder="Enter your district"
                    className="h-12"
                    {...register("address.district")}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium text-foreground">
                    State
                  </Label>
                  <Input
                    id="state"
                    placeholder="Enter your state"
                    className="h-12"
                    {...register("address.state")}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium text-foreground">
                    Country
                  </Label>
                  <Input
                    id="country"
                    placeholder="Enter your country"
                    className="h-12"
                    {...register("address.country")}
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="pincode" className="text-sm font-medium text-foreground">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    placeholder="Enter your pincode"
                    className="h-12"
                    {...register("address.pincode")}
                  />
                </motion.div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full h-12 lg:w-auto lg:mx-auto" variants={buttonVariants} whilehover="hover">
                Submit
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddressForms;