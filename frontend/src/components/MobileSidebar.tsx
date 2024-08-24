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

const MobileSidebar = () => {
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>open dialougebox</SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <div className="border-b-2 border-b-orange-600 py-1">
                <SheetTitle>welcome to BestFood.com</SheetTitle>
              </div>
              <SheetDescription className="pt-2">
                <Link href={"/login"}>
                  <Button className="bg-orange-600 w-full">Login</Button>
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
