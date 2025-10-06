import { cuisineList } from "@/utils/constants";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useTransition } from "react";

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const checkboxVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] as any },
  },
};

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
  const [isPending, startTransition] = useTransition();

  const handleCuisinesReset = () => {
    startTransition(() => onChange([]));
  };

  return (
    <Card className="w-full h-fit shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Filter by Cuisines</span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-1 rounded-full bg-destructive/10 text-destructive"
          >
            <Button
              onClick={handleCuisinesReset}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-destructive/20"
              disabled={isPending}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </motion.div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
          className="space-y-3 max-h-80 overflow-y-auto"
        >
          {cuisineList
            .slice(0, isExpanded ? cuisineList.length : 5)
            .map((cuisine, i) => {
              const isSelected = selectedCuisines.includes(cuisine);
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  whileHover="hover"
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <motion.div variants={checkboxVariants}>
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
                        startTransition(() => onChange(updatedCuisines));
                      }}
                    />
                  </motion.div>
                  <Label
                    htmlFor={cuisine}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {cuisine}
                  </Label>
                </motion.div>
              );
            })}
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="pt-2 border-t border-border/20"
        >
          <Button onClick={onExpandedClick} variant="link" className="p-0 m-0 gap-1 text-sm text-muted-foreground hover:text-foreground">
            {isExpanded ? (
              <span className="flex flex-row items-center">
                View Less <ChevronUp className="w-4 h-4" />
              </span>
            ) : (
              <span className="flex flex-row items-center">
                View More <ChevronDown className="w-4 h-4" />
              </span>
            )}
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  );
};
export default CuisineFilter;