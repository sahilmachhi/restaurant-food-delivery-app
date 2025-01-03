import { cuisineList } from "@/utils/constants";
import {  ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

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
  const handleCuisinesReset = () => onChange([]);
  return (
    <>
      <div className="">
        <div className="flex items-center justify-between gap-5">
          <h1 className="font-medium text-lg whitespace-nowrap">
            Filter by cuisines
          </h1>
          <Button onClick={handleCuisinesReset} className="rounded-full">
            Reset
          </Button>
        </div>

        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 7)
          .map((cuisine, i) => {
            const isSelected = selectedCuisines.includes(cuisine);
            return (
              <div key={i} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={cuisine}
                  checked={isSelected}
                  onCheckedChange={() => {
                    const updatedCuisines = isSelected
                      ? selectedCuisines.filter(
                        (selectedCuisine: any) =>
                          selectedCuisine !== cuisine
                      )
                      : [...selectedCuisines, cuisine];
                    onChange(updatedCuisines);
                  }}
                />
                <Label
                  htmlFor={cuisine}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
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
