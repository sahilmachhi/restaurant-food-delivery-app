import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "console";

const AddressForms = () => {
  const schema = z.object({
    name: z.string().min(1, { message: "please enter name" }),
    age: z.number().min(1, { message: "please enter age" }),
  });
  type input = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<input>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="w-full">
        <div className="flex flex-col gap-8 justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Name</label>
              <Input placeholder="name" {...register("name")} />
            </div>
            {errors.name && <p className="bg-red-400">{errors.name.message}</p>}
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>age</label>
              <Input placeholder="age" {...register("age")} type="number" />
            </div>
            {errors.age && <p className="bg-red-400">{errors.age.message}</p>}
            {/* <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Name</label>
              <Input placeholder="name" {...register("name")} />
            </div> */}
            {/* <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Name</label>
              <Input placeholder="name" {...register("name")} />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Name</label>
              <Input placeholder="name" {...register("name")} />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Name</label>
              <Input placeholder="name" {...register("name")} />
            </div>
            <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
              <label>Name</label>
              <Input placeholder="name" {...register("name")} />
            </div> */}
            <Button type="submit">submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressForms;
