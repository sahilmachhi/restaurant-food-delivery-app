import { Input } from "./ui/input";

const AddressForm = ({
  address,
  setAddress,
}: {
  address: any;
  setAddress: any;
}) => {
  return (
    <>
      <div className="w-full">
        <div>
          <form>
            <div>
              <label>address name</label>
              <Input />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressForm;
