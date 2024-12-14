import { cuisineList } from "@/utils/constants";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

const CuisineFilter = ({
  selectedCuisines,
  onChange,
  isExpanded,
  onExpandedClick,
}: {
  selectedCuisines: any;
  onChange: any;
  isExpanded: boolean;
  onExpandedClick: any;
}) => {
  const handleCuisinesChange = (e: any) => {
    const clickedCuisine = e.target.value;
    const isChecked = e.target.checked;
    const newCuisinesList = isChecked
      ? [...selectedCuisines, clickedCuisine]
      : selectedCuisines.filter((cuisine: any) => cuisine !== clickedCuisine);

    onChange(newCuisinesList);
  };

  const handleCuisinesReset = () => onChange([]);

  // return (
  //   <>
  //     <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
  //       <h1 className="font-medium text-lg">
  //         {/* ({searchedRestaurant?.data.length}) Search result found */}
  //       </h1>
  //       <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
  //         {cuisineList.map((selectedFilter: string, idx: number) => (
  //           <div
  //             key={idx}
  //             className="relative inline-flex items-center max-w-full"
  //           >
  //             <Badge
  //               className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
  //               variant="outline"
  //             >
  //               {selectedFilter}
  //             </Badge>
  //             <Button
  //               // onClick={() => setAppliedFilter(selectedFilter)}
  //               className="absolute text-[#D19254] right-1 hover:cursor-pointer"
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      {/* <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Cuisine</div>
        <div
          onClick={handleCuisinesReset}
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500"
        >
          Reset Filters
        </div>
      </div> */}

      <div className="">
        <div className="flex items-center justify-between gap-5">
          <h1 className="font-medium text-lg whitespace-nowrap">
            Filter by cuisines
          </h1>
          <Button onClick={handleCuisinesReset} className="rounded-full">
            Reset
          </Button>
        </div>

        {/* <div className="space-y-2 flex flex-col">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, index) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div className="flex" key={index}>
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-600 text-green-600"
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            );
          })}

        <Button
          onClick={onExpandedClick}
          variant="link"
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div> */}
        {/* <div className="flex flex-col"> */}
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, i) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div key={i} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={`cuisine_${cuisine}`}
                  checked={isSelected}
                  onClick={handleCuisinesChange}
                />
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button onClick={onExpandedClick} variant="link" className="p-0 m-0">
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};
export default CuisineFilter;
