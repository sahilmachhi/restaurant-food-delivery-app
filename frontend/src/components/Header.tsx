import Link from "next/link";
import { Button } from "./ui/button";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  return (
    <>
      <div className="border-b-2 border-b-orange-600 py-6">
        <div className="container items-center mx-auto flex justify-between">
          <Link href={"/"}>BestFood.com</Link>

          <Link href={"/login"}>
            <Button className="bg-orange-600 hidden md:block">Login</Button>
          </Link>

          <MobileSidebar />
        </div>
      </div>
    </>
  );
};
export default Header;
