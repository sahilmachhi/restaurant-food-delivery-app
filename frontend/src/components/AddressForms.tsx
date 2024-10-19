import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const AddressForms = ({
  // setAddress,
  address,
  updateAddressData,
  fetchAddress,
}: {
  // setAddress: any;
  address: any;
  updateAddressData: any;
  fetchAddress: any;
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
    // if (address) {
    const fetchdata = async () => {
      const address = await fetchAddress();
      console.log(address);
      reset({
        name: address?.name,
      });
    };

    fetchdata();
    // }
  }, []);

  const onSubmit = (data: any) => {
    updateAddressData(data);
  };
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-8 justify-center items-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8 justify-center items-center"
          >
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>address Tag Name</label>
              <Input placeholder="name" {...register("name")} />
            </div>
            {errors.name && <p className="bg-red-400">{errors.name.message}</p>}
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Name as per address</label>
              <Input
                placeholder="name as per address"
                {...register("address.name")}
              />
            </div>
            {errors.address?.name && (
              <p className="bg-red-400">{errors.address?.name.message}</p>
            )}
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Address line 1</label>
              <Input
                placeholder="enter address line 1 here"
                {...register("address.addressLine1")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Address line 2</label>
              <Input
                placeholder="enter address line 2 here"
                {...register("address.addressLine2")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>City</label>
              <Input
                placeholder="enter your city here"
                {...register("address.city")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>District</label>
              <Input
                placeholder="enter your disctrict here"
                {...register("address.district")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>State</label>
              <Input
                placeholder="enter your state here"
                {...register("address.state")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Country</label>
              <Input
                placeholder="enter your country here"
                {...register("address.country")}
              />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Pincode</label>
              <Input
                placeholder="enter your local pincode here"
                {...register("address.pincode")}
              />
            </div>
            <Button type="submit">submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressForms;
