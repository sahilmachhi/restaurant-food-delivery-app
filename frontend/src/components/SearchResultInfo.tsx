import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

const SearchResultInfo = ({ total }: { total: number }) => {
  return (
    <Card className="w-full lg:w-auto">
      <CardContent className="p-4 flex items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-lg font-semibold text-foreground">
            {total} restaurants found
          </span>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }}>
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" />
            Change Location
          </Link>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SearchResultInfo;