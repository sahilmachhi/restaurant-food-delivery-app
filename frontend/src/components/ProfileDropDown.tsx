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

const ProfileDropDown = ({ LogoutHandler }: { LogoutHandler: any }) => {
  const handleLogout = () => {
    LogoutHandler();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image
            className="w-10 h-10 rounded-full"
            src={profile}
            alt="Rounded avatar"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/profile`}>My profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/myRestaurant`}>My Restaurant</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={`/address`}>My address</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-center">
            <Button onClick={handleLogout}>Log out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropDown;
