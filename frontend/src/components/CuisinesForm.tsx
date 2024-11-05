import { cuisineList } from "@/utils/constants";

import { Controller } from "react-hook-form";

const CuisinesForm = ({ control }: { control: any }) => {
  // const [selectedCuisines, setCuisines] = useState<string[]>(
  //   restaurantData?.cuisines || []
  // );

  // const handleCheckboxChange = (value: string) => {
  //   setCuisines((prevValues) =>
  //     prevValues.includes(value)
  //       ? prevValues.filter((item) => item !== value)
  //       : [...prevValues, value]
  //   );
  // };

  return (
    <div className="flex flex-col gap-2 items-baseline justify-center w-[680px]">
      <label>Please select</label>
      {cuisineList.map((cuisine, index) => (
        <div className="flex items-center justify-center gap-2" key={index}>
          <Controller
            name="cuisines"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id={cuisine}
                value={cuisine}
                checked={field?.value?.includes(cuisine)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    field.onChange([...field.value, cuisine]);
                  } else {
                    field.onChange(
                      field.value.filter((value: string) => value !== cuisine)
                    );
                  }
                }}
              />
            )}
          />
          <label htmlFor={cuisine}>{cuisine}</label>
        </div>
      ))}
    </div>
  );
};

export default CuisinesForm;
