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
    <Card className="overflow-hidden shadow-sm border-border/20">
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startTransition(() => form.handleSubmit(onSubmit)(e));
            }}
            className={`flex items-center gap-3 p-4 ${
              form.formState.errors.searchQuery ? "ring-2 ring-destructive/20" : ""
            }`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-primary"
            >
              <Search size={20} className="hidden md:block" />
            </motion.div>
            <FormField
              control={form.control}
              name="searchQuery"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none bg-transparent text-lg focus-visible:ring-0 placeholder:text-muted-foreground transition-colors duration-200"
                      placeholder={placeHolder}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-2"
            >
              <motion.div whileHover="hover">
                <Button
                  onClick={handleReset}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 rounded-full border-border hover:border-border/50"
                  disabled={isPending}
                >
                  Reset
                </Button>
              </motion.div>
              <motion.div whileHover="hover" variants={buttonVariants}>
                <Button
                  type="submit"
                  size="sm"
                  className="h-10 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 shadow-sm"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Search className="w-4 h-4 animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SearchBar;