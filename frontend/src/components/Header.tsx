import Link from "next/link";
import LoginButton from "./LoginButton";
import MobileSidebar from "./MobileSidebar";

const Header = () => {
  return (
    <>
      <div className="border-b-2 border-b-orange-600 py-6">
        <div className="container items-center mx-auto flex justify-between">
          <Link href={"/"}>BestFood</Link>
          <LoginButton />
        </div>
      </div>
    </>
  );
};
export default Header;
