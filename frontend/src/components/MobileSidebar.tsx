"use client";
import { motion } from "framer-motion";
import { ArrowRight, LogOut, Menu, Store, User, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent, SheetHeader,
  SheetTitle,
  SheetTrigger
} from "./ui/sheet";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const closeVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "hsl(var(--accent))",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const MobileSidebar = ({
  user,
  LogoutHandler,
}: {
  user: {
    username: string;
  } | null;
  LogoutHandler: any;
}) => {
  const handleLogout = () => {
    LogoutHandler();
  };
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              className="cursor-pointer p-2 rounded-lg hover:bg-accent"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </motion.div>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px] bg-background border-border/20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="space-y-4 mt-4 relative"
            >
              <motion.div
                variants={closeVariants}
                whileHover="hover"
                whileTap="tap"
                className="absolute right-0 top-0 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg ring-1 ring-border/50 hover:ring-primary/20 transition-all duration-200 z-10"
              >
                <SheetTrigger asChild>
                  <button
                    className="p-0 border-none bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full"
                  >
                    <X className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors duration-200" />
                  </button>
                </SheetTrigger>
              </motion.div>
              <SheetHeader className="space-y-4 pt-16">
                <div className="flex items-center flex-col gap-3 border-b border-border/20 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Store className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <SheetTitle className="text-lg font-bold text-foreground">
                      {user
                        ? `Welcome ${user?.username}`
                        : `Welcome to BestFood.com`}
                    </SheetTitle>
                    <p className="text-sm text-muted-foreground">
                      {user ? "Manage your account" : "Sign in to continue"}
                    </p>
                  </div>
                </div>
                {user && (
                  <motion.div variants={itemVariants} className="space-y-2">
                    <motion.div variants={itemVariants} whileHover={{ x: 4 }}>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start h-auto p-3 text-left hover:bg-accent"
                      >
                        <Link href="/profile" className="flex items-center gap-3">
                          <User className="w-4 h-4" />
                          My Profile
                          <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
                        </Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </SheetHeader>
              <motion.div variants={itemVariants}>
                <Link href="/login">
                  {user ? (
                    <Button
                      onClick={handleLogout}
                      className="w-full"
                      variant="outline"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Log Out
                    </Button>
                  ) : (
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Login
                    </Button>
                  )}
                </Link>
              </motion.div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileSidebar;