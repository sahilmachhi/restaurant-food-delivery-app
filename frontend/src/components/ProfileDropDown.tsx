import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import profile from "../../public/profile.svg";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Store, MapPin, LogOut } from "lucide-react";

const itemVariants = {
  hover: {
    scale: 1.02,
    backgroundColor: "hsl(var(--primary) / 0.1)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const ProfileDropDown = ({ LogoutHandler }: { LogoutHandler: any }) => {
  const handleLogout = () => {
    LogoutHandler();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className=""
        >
          <Image
            className="w-10 h-10"
            src={profile}
            alt="Profile avatar"
          />
        </motion.div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">My Account</p>
            <p className="text-xs text-muted-foreground">Manage your profile</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <motion.div variants={itemVariants} whileHover="hover">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2 w-full">
              <User className="w-4 h-4" />
              My Profile
            </Link>
          </DropdownMenuItem>
        </motion.div>
        <motion.div variants={itemVariants} whileHover="hover">
          <DropdownMenuItem asChild>
            <Link href="/my_restaurant" className="flex items-center gap-2 w-full">
              <Store className="w-4 h-4" />
              My Restaurant
            </Link>
          </DropdownMenuItem>
        </motion.div>
        <motion.div variants={itemVariants} whileHover="hover">
          <DropdownMenuItem asChild>
            <Link href="/address" className="flex items-center gap-2 w-full">
              <MapPin className="w-4 h-4" />
              My Address
            </Link>
          </DropdownMenuItem>
        </motion.div>
        <DropdownMenuSeparator />
        <motion.div variants={itemVariants} whileHover="hover">
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center justify-start gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;