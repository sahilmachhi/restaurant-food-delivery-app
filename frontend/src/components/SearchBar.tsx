import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar = () => {
  return (
    <>
      <div className="flex flex-row justify-normal gap-3">
        <Input placeholder="search here" />
        <Button>Search</Button>
      </div>
    </>
  );
};

export default SearchBar;
