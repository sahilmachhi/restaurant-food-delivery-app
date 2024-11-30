import Link from "next/link";
import { Button } from "./ui/button";

const AddressCard = ({
  address,
  deleteAddress,
}: {
  address: any;
  deleteAddress: any;
}) => {
  return (
    <>
      <div className="w-full flex flex-col gap-10 rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-10">
        <div>
          <h1>{address.name}</h1>
          <h2>{address.address.name}</h2>
          <div className="flex-col flex gap-2">
            <p>
              {address.address.addressLine1},{address.address.addressLine2}
            </p>
            <p>
              {address.address.city} - {address.address.pincode},
            </p>
            <p>
              {address.address.district}, {address.address.state},{" "}
              {address.address.country}
            </p>
            <h1>{address._id}</h1>
          </div>
          <div className="flex gap-2 w-full md:flex-row flex-col justify-center items-center mt-5">
            <Link
              href={`/address/${address._id}`}
              prefetch={false}
              className="w-full"
            >
              <Button className="w-full bg-yellow-300 text-black hover:bg-yellow-700 hover:text-white">
                edit
              </Button>
            </Link>
            <Button
              className="w-full bg-red-400 hover:bg-red-700"
              onClick={() => deleteAddress(address._id)}
            >
              delete
            </Button>
            <Button className="w-full bg-green-400 hover:bg-green-700">
              set as Default
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCard;
