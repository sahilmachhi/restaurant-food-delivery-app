"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

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
          <SheetTrigger>open dialougebox</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="border-b-2 border-b-orange-600 py-1 w-full">
                <SheetTitle>
                  {user
                    ? `welcome ${user?.username}`
                    : `welcome to BestFood.com`}
                </SheetTitle>
              </div>
              <SheetDescription className="pt-2">
                {user ? <Link href={"/profile"}>profile</Link> : null}
              </SheetDescription>
              <SheetDescription className="pt-2">
                <Link href={"/login"}>
                  {user ? (
                    <Button onClick={handleLogout} className="w-full">
                      Log out
                    </Button>
                  ) : (
                    <Button className="bg-orange-600 w-full">Login</Button>
                  )}
                </Link>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileSidebar;
