import { Button } from "./ui/button";
import { Input } from "./ui/input";
const AddressForm = ({
  address,
  setAddress,
}: {
  address: any;
  setAddress: any;
}) => {
  const inputVal = [
    {
      name: "name",
      placeholder: "tag name",
    },
    {
      name: "address.name",
      placeholder: "name as per address",
    },
    {
      name: "address.addressLine1",
      placeholder: "address line 1",
    },
    {
      name: "address.addressLine2",
      placeholder: "address line 2",
    },
    {
      name: "address.city",
      placeholder: "city",
    },
    {
      name: "address.district",
      placeholder: "district",
    },
    {
      name: "address.state",
      placeholder: "state",
    },
    {
      name: "address.state",
      placeholder: "state",
    },
    {
      name: "address.country",
      placeholder: "country",
    },
    {
      name: "address.country",
      placeholder: "country",
    },
    {
      name: "address.pincode",
      placeholder: "pincode",
    },
  ];
  console.log(address);
  const handleChange = (e: any) => {
    const { value, name } = e.target;

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setAddress({
        ...address,
        [parentKey]: {
          ...address[parentKey],
          [childKey]: value,
        },
      });
    } else {
      setAddress({ ...address, [name]: value });
    }
  };
  return (
    <>
      <div className="w-full">
        <div>
          <form>
            <div className="flex flex-col gap-8 justify-center items-center">
              {inputVal.map((val, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 items-baseline justify-center w-[680px]"
                >
                  <label htmlFor={val.name}>{val.placeholder}</label>
                  <Input
                    placeholder={`enter ${val.placeholder}`}
                    onChange={handleChange}
                    name={val.name}
                    type="text"
                    value={
                      val.name.includes(".")
                        ? address[val.name.split(".")[0]]?.[
                            val.name.split(".")[1]
                          ] || ""
                        : address[val.name] || ""
                    }
                  />
                </div>
              ))}
              <Button className="mt-6 ">submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
