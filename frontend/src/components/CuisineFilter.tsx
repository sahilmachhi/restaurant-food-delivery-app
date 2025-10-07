import { cuisineList } from "@/utils/constants";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useRef, useTransition } from "react";

const itemVariants = {
  hidden: { opacity: 0, x: -10, y: 10 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const checkboxVariants = {
  hover: {
    scale: 1.08,
    rotate: 2,
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const resetVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 16px rgba(239, 68, 68, 0.2)",
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const expandVariants = {
  hover: {
    scale: 1.02,
    color: "hsl(var(--primary))",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

;

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
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleCuisinesReset = () => {
    startTransition(() => onChange([]));
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden sm:block">
        <Card className="w-full h-fit shadow-sm border-border/20 backdrop-blur-sm bg-background/80 overflow-hidden">
          <CardHeader className="pb-3 px-6 bg-gradient-to-r from-background/50 to-muted/50">
            <CardTitle className="flex items-center justify-between text-foreground">
              <span className="text-base font-bold tracking-tight">Filter by Cuisines</span>
              <motion.div
                variants={resetVariants}
                whileHover="hover"
                className="p-1.5 rounded-full bg-destructive/5 text-destructive border border-destructive/10"
              >
                <Button
                  onClick={handleCuisinesReset}
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0 hover:bg-destructive/10"
                  disabled={isPending}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </Button>
              </motion.div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="space-y-0 max-h-72 overflow-hidden"
            >
              <div className="space-y-2.5 px-6 py-4 max-h-72 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-muted/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
                {cuisineList
                  .slice(0, isExpanded ? cuisineList.length : 5)
                  .map((cuisine, i) => {
                    const isSelected = selectedCuisines.includes(cuisine);
                    return (
                      <motion.div
                        key={cuisine}
                        variants={itemVariants}
                        whileHover="hover"
                        onClick={() => {
                          const updatedCuisines = isSelected
                            ? selectedCuisines.filter(
                              (selectedCuisine: any) =>
                                selectedCuisine !== cuisine
                            )
                            : [...selectedCuisines, cuisine];
                          startTransition(() => onChange(updatedCuisines));
                        }}
                        className="group flex items-center space-x-3.5 p-2.5 rounded-xl hover:bg-accent/50 cursor-pointer transition-colors duration-200 border border-transparent hover:border-primary/20"
                      >
                        <motion.div variants={checkboxVariants} className="flex-shrink-0 items-center justify-center flex">
                          <Checkbox
                            id={cuisine}
                            checked={isSelected}
                            className="h-4 w-4 rounded border-2 border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:bg-background data-[state=unchecked]:border-input"
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
                          className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 group-hover:text-foreground transition-colors duration-200"
                        >
                          {cuisine}
                        </Label>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
            <motion.div
              variants={expandVariants}
              whileHover="hover"
              className="px-6 py-3 border-t border-border/10 bg-muted/20"
            >
              <Button
                onClick={onExpandedClick}
                variant="ghost"
                className="gap-1.5 text-sm text-muted-foreground hover:text-primary h-auto font-medium justify-start w-full py-2 px-2"
              >
                {isExpanded ? (
                  <span className="flex flex-row items-center">
                    View Less <ChevronUp className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="flex flex-row items-center">
                    View More <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                )}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Version */}
      <div className="block sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-sm font-medium h-10 px-3 border-border/50 hover:border-primary/30"
              disabled={isPending}
            >
              Filter by Cuisines
              <ChevronDown className="w-4 h-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="p-0 mt-1 DropdownMenuContent rounded-xl border-border/20 backdrop-blur-sm bg-background/95 shadow-lg"

            sideOffset={4}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="py-2"
            >
              <div className="space-y-2.5 px-3 py-2 w-full max-h-72 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-muted/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/40">
                {cuisineList.map((cuisine, i) => {
                  const isSelected = selectedCuisines.includes(cuisine);
                  return (
                    <motion.div
                      key={cuisine}
                      variants={itemVariants}
                      whileHover="hover"
                      onClick={() => {
                        const updatedCuisines = isSelected
                          ? selectedCuisines.filter(
                            (selectedCuisine: any) =>
                              selectedCuisine !== cuisine
                          )
                          : [...selectedCuisines, cuisine];
                        startTransition(() => onChange(updatedCuisines));
                      }}
                      className="group flex items-center space-x-3.5 p-2.5 rounded-xl hover:bg-accent/50 cursor-pointer transition-colors duration-200 border border-transparent hover:border-primary/20"
                    >
                      <motion.div variants={checkboxVariants} className="flex-shrink-0 items-center justify-center flex">
                        <Checkbox
                          id={cuisine}
                          checked={isSelected}
                          className="h-4 w-4 rounded border-2 border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=unchecked]:bg-background data-[state=unchecked]:border-input"
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
                        className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1 group-hover:text-foreground transition-colors duration-200"
                      >
                        {cuisine}
                      </Label>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              variants={resetVariants}
              whileHover="hover"
              className="border-t border-border/25 bg-destructive/5 h-10 hover:bg-destructive/25"
            >
              <Button
                onClick={handleCuisinesReset}

                size="sm"
                className="h-full w-full justify-start gap-2 text-destructive bg-transparent hover:bg-transparent"
                disabled={isPending}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </Button>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default CuisineFilter;