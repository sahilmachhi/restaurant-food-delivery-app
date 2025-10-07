import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useEffect, useTransition } from "react";

const formSchema = z.object({
  searchQuery: z.string({
    required_error: "Restaurant name is required",
  }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
  onSubmit: any;
  placeHolder: string;
  onReset?: () => void;
  searchQuery?: string;
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const SearchBar = ({ onSubmit, onReset, placeHolder, searchQuery }: Props) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SearchForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchQuery,
    },
  });

  useEffect(() => {
    form.reset({ searchQuery });
  }, [searchQuery]);

  const handleReset = () => {
    form.reset({
      searchQuery: "",
    });

    if (onReset) {
      onReset();
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm border-border/20 backdrop-blur-sm bg-background/80">
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTransition(() => form.handleSubmit(onSubmit)(e));
            }}
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 ${
              form.formState.errors.searchQuery ? "ring-2 ring-destructive/20" : ""
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-primary flex-shrink-0"
              >
                <Search size={20} className="hidden sm:block" />
              </motion.div>
              <FormField
                control={form.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        className="border-none bg-transparent text-base sm:text-lg focus-visible:ring-0 placeholder:text-muted-foreground transition-all duration-200 pr-0"
                        placeholder={placeHolder}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 sm:gap-2 flex-shrink-0">
              <motion.div whileHover="hover">
                <Button
                  onClick={handleReset}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 px-3 sm:px-4 rounded-full border-border hover:border-border/50 flex-shrink-0 min-w-[80px] sm:min-w-[100px]"
                  disabled={isPending}
                >
                  Reset
                </Button>
              </motion.div>
              <motion.div whileHover="hover" variants={buttonVariants}>
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 px-4 sm:px-6 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground disabled:opacity-50 shadow-md hover:shadow-lg flex-shrink-0 min-w-[80px] sm:min-w-[100px] transition-all duration-300"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Search className="w-4 h-4 animate-spin mr-2" />
                      <span className="hidden sm:inline">Searching...</span>
                      <span className="sm:hidden">Go</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2 hidden sm:block" />
                      <span className="sm:hidden">Go</span>
                      <span className="hidden sm:inline">Search</span>
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;