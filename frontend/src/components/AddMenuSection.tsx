"use client";

import { Button } from "./ui/button";
import { useForm, useFormContext } from "react-hook-form";
import { Input } from "./ui/input";

export const AddMenuSection = ({
  isHidden,
  setHidden,
}: {
  isHidden: boolean;
  setHidden: any;
}) => {
  const { register, handleSubmit, reset } = useFormContext();

  const SubmitForm = () => {};
  return (
    <>
      <div>
        <div>
          {!isHidden ? (
            <form
              // onSubmit={handleSubmit()}
              className="flex flex-row gap-20 justify-between items-center mb-12"
            >
              <div>
                <div className="flex flex-col gap-2 items-baseline justify-center w-[480px]">
                  <label>Menu Name</label>
                  <Input placeholder="Enter menu name" {...register("name")} />
                </div>
                <div className="flex flex-col gap-2 items-baseline justify-center w-[480px]">
                  <label>Menu Description</label>
                  <Input
                    placeholder="Enter menu Description"
                    {...register("description")}
                  />
                </div>
                <div className="flex flex-col gap-2 items-baseline justify-center w-[480px]">
                  <label>Price</label>
                  <Input
                    placeholder="Enter price here"
                    {...register("price")}
                  />
                </div>
                <div className="flex flex-col gap-2 items-baseline justify-center w-[480px]">
                  <label>Menu Image</label>
                  <Input {...register("imageUrl")} type="file" />
                </div>
              </div>
              <div className="flex gap-10 flex-col">
                <Button type="submit">Submit</Button>
                <Button
                  onClick={() => {
                    setHidden(true);
                    reset({
                      name: "",
                      description: "",
                      price: "",
                      imageUrl: null,
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : null}
        </div>
        <Button
          onClick={() => {
            setHidden(false);
          }}
        >
          add Menu
        </Button>
      </div>
    </>
  );
};

export default AddMenuSection;
