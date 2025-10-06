import Link from "next/link";
import { motion } from "framer-motion";
import LoginButton from "./LoginButton";
import MobileSidebar from "./MobileSidebar";
import { Store } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const Header = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="border-b border-border/20 bg-background/95 backdrop-blur-sm sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 lg:px-36 md:px-16 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <Store className="w-6 h-6 text-primary" />
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-200"
          >
            BestFood.com
          </Link>
        </motion.div>
        <LoginButton />
      </div>
    </motion.div>
  );
};

export default Header;