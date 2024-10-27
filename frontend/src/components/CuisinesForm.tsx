import { cuisineList } from "@/utils/constants";
import { Checkbox } from "./ui/checkbox";
const CuisinesForm = ({ register }: { register: any }) => {
  return (
    <>
      <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
        <label>Please select</label>
        {/* cuisines selection box goes here */}
        {cuisineList.map((cuisine, index) => (
          <div className="flex items-center justify-center gap-2" key={index}>
            <input
              type="checkbox"
              id={cuisine}
              value={cuisine}
              {...register("cuisines")}
            />
            <label htmlFor={cuisine}>{cuisine}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CuisinesForm;
