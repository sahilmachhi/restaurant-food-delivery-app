import { cuisineList } from "@/utils/constants";
import { Controller } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: [0.22, 1, 0.36, 1] as any,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const checkboxVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] as any},
  },
};

const CuisinesForm = ({ control }: { control: any }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      <Label className="text-sm font-medium text-foreground">
        Select Cuisines
      </Label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
        {cuisineList.map((cuisine, index) => (
          <motion.div
            key={cuisine}
            variants={itemVariants}
            whileHover="hover"
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent cursor-pointer"
          >
            <motion.div variants={checkboxVariants}>
              <Controller
                name="cuisines"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id={cuisine}
                    value={cuisine}
                    checked={field.value?.includes(cuisine)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...(field.value || []), cuisine]
                        : field.value?.filter((value: string) => value !== cuisine) || [];
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
            </motion.div>
            <Label
              htmlFor={cuisine}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
            >
              {cuisine}
            </Label>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CuisinesForm;