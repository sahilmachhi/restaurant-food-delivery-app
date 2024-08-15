import HomePage from "@/components/HomePage";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <>
      <HomePage />
      <div className="w-3/6">
        <SearchBar />
      </div>
    </>
  );
}
