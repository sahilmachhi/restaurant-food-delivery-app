import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { inputVal } from "../utils/constants";
const AddressForm = ({
  address,
  setAddress,
  updateAddressData,
}: {
  address: any;
  setAddress: any;
  updateAddressData: any;
}) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    updateAddressData();
  };
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    console.log(address);

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
          <form onSubmit={handleSubmit}>
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
