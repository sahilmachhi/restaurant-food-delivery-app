import HomePage from "@/components/HomePage";
import SearchBar from "@/components/SearchBar";
export const revalidate = false;
export default function Home() {
  return (
    <>
      <HomePage />
      <div className="w-3/6">{/* <SearchBar /> */}</div>
    </>
  );
}
